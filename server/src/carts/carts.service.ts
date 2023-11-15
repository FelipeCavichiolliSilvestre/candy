import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import {
  GetClientCartOutput,
  ICartsService,
  UpdateCartItemInput,
} from "./carts.interface";

@Injectable()
export class CartsService implements ICartsService {
  constructor(private prisma: PrismaService) {}

  async getClientCart(clientId: string): Promise<GetClientCartOutput> {
    const items = await this.prisma.cartItem.findMany({
      where: { clientId },
      select: { product: true, quantity: true },
    });

    return items.map(({ product, quantity }) => ({
      product,
      quantityOrdered: quantity,
    }));
  }

  // TODO: Handle not found error
  async updateCartItem(data: UpdateCartItemInput): Promise<void> {
    const { clientId, productId, quantity } = data;

    if (quantity === 0) {
      await this.prisma.cartItem.delete({
        where: { productId_clientId: { clientId, productId } },
      });

      return;
    }

    await this.prisma.cartItem.upsert({
      where: { productId_clientId: { clientId, productId } },
      create: { clientId, productId, quantity },
      update: { quantity },
    });
  }
}
