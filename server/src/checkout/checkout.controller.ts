import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ICheckoutService } from "./checkout.interface";
import { JwtPayload, Require } from "src/auth";
import { UsersRole } from "src/auth/types";
import { User } from "src/auth/decorators/user.decorator";
import { CheckoutCartBodyDTO } from "./dtos";

@ApiTags("checkout", "cart", "orders")
@Controller("/")
export class CheckoutController {
  constructor(private checkoutService: ICheckoutService) {}

  @Post("/clients/me/checkout")
  @Require(UsersRole.CLIENT)
  async checkoutCart(
    @Body() body: CheckoutCartBodyDTO,
    @User() user: JwtPayload
  ) {
    return await this.checkoutService.checkoutCart({
      address: body.address,
      clientId: user.id,
    });
  }

  @Post("/orders/:orderId/checkout")
  @Require(UsersRole.CLIENT)
  async checkoutOrder(@Param("orderId") orderId: string) {
    return await this.checkoutService.checkoutOrder({
      orderId,
    });
  }
}
