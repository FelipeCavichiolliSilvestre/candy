import { Body, Controller, Get, Patch } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ICartsService } from "./carts.interface";
import { JwtPayload, Require } from "src/auth";
import { UsersRole } from "src/auth/types";
import { User } from "src/auth/decorators";
import { UpdateClientBodyDTO } from "./dtos";
import { GetClientCartResponseDTO } from "./dtos/get-client-cart.dto";

@Controller("/")
@ApiTags("cart")
@ApiBearerAuth()
export class CartsController {
  constructor(private cartsService: ICartsService) {}

  @Get("/clients/me/cart")
  @Require(UsersRole.CLIENT)
  async getClientCart(
    @User() user: JwtPayload
  ): Promise<GetClientCartResponseDTO[]> {
    return await this.cartsService.getClientCart(user.id);
  }

  // TODO: Make cart update accept multiple products
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
