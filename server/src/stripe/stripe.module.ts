import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import { StripeService } from "./stripe.service";
import { StripeController } from "./stripe.controller";
import { OrdersModule } from "../orders";

@Global()
@Module({
  imports: [OrdersModule],
  controllers: [StripeController],
  providers: [
    {
      provide: StripeService,
      useFactory(config: ConfigService) {
        const apiKey = config.getOrThrow("STRIPE_KEY");

        return new Stripe(apiKey, {
          apiVersion: "2022-11-15",
          typescript: true,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [StripeService],
})
export class StripeModule {}
