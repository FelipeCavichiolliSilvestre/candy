import { Body, Controller, Get, Patch } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ICartsService } from "./carts.interface";
import { JwtPayload, Require } from "src/auth";
import { UsersRole } from "src/auth/types";
import { User } from "src/auth/decorators/user.decorator";
import { UpdateClientBodyDTO } from "./dtos";

@ApiTags("cart")
@Controller("/")
export class CartsController {
  constructor(private cartsService: ICartsService) {}

  @Get("/clients/me/cart")
  @Require(UsersRole.CLIENT)
  async getUserCart(@User() user: JwtPayload) {
    return await this.cartsService.getClientCart({ clientId: user.id });
  }

  @Patch("/clients/me/cart")
  @Require(UsersRole.CLIENT)
  async updateUserCart(
    @Body() body: UpdateClientBodyDTO,
    @User() user: JwtPayload
  ) {
    return await this.cartsService.updateCartItem({
      clientId: user.id,
      ...body,
    });
  }
}
