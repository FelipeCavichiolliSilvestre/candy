import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ICheckoutService } from "./checkout.interface";
import { JwtPayload, Require } from "src/auth";
import { UsersRole } from "src/auth/types";
import { User } from "src/auth/decorators/user.decorator";
import { CheckoutCartBodyDTO, CheckoutResponseDTO } from "./dtos";

@Controller("/")
@ApiTags("orders")
@ApiBearerAuth()
export class CheckoutController {
  constructor(private checkoutService: ICheckoutService) {}

  @Post("/checkout")
  @Require(UsersRole.CLIENT)
  async checkoutCart(
    @Body() body: CheckoutCartBodyDTO,
    @User() user: JwtPayload
  ): Promise<CheckoutResponseDTO> {
    return await this.checkoutService.checkoutCart({
      address: body.address,
      clientId: user.id,
    });
  }

  @Post("/orders/:orderId/checkout")
  @Require(UsersRole.CLIENT)
  async checkoutOrder(
    @Param("orderId") orderId: string
  ): Promise<CheckoutResponseDTO> {
    return await this.checkoutService.checkoutOrder({
      orderId,
    });
  }
}
