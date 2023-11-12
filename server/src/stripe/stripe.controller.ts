import {
  Req,
  Controller,
  Post,
  Headers,
  UnauthorizedException,
  RawBodyRequest,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { AllowUnauthenticated } from "src/auth";
import { StripeService } from "./stripe.service";
import { IOrdersService } from "../orders";

@Controller("/stripe")
export class StripeController {
  private logger = new Logger(StripeController.name);

  constructor(
    private stripeService: StripeService,
    private configService: ConfigService,
    private ordersService: IOrdersService
  ) {}

  @Post("/webhooks")
  @AllowUnauthenticated()
  async webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers("stripe-signature") signature: string
  ) {
    if (!req.rawBody)
      throw new Error("Request object should contain rawBody property");

    const event = this.validateEvent(req.rawBody, signature);
    this.logger.log(`Receive an ${event.type} event with id ${event.id}`);

    if (event.type === "checkout.session.completed") {
      await this.ordersService.confirmPayment(
        event.data.object["client_reference_id"]
      );
    }
  }

  private validateEvent(rawBody: Buffer, signature: string) {
    try {
      return this.stripeService.webhooks.constructEvent(
        rawBody,
        signature,
        this.configService.getOrThrow("STRIPE_SECRET")
      );
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
