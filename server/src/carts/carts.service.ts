import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import {
  CheckoutCartInput,
  CheckoutOrderInput,
  CheckoutOutput,
  GetUserCartInput,
  GetUserCartOutput,
  ICartsService,
  UpdateCartItemInput,
} from "./carts.interface";
import { StripeService } from "src/stripe";
import { OrderStatus } from "@prisma/client";

@Injectable()
export class CartsService implements ICartsService {
  constructor(private prisma: PrismaService, private stripe: StripeService) {}

  async getClientCart(data: GetUserCartInput): Promise<GetUserCartOutput> {
    const { clientId } = data;

    const items = await this.prisma.cartItem.findMany({
      where: { clientId },
      select: { product: true, quantity: true },
    });

    return items.map(({ product, quantity }) => ({
      product,
      quantityOrdered: quantity,
    }));
  }

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

  async checkoutCart(data: CheckoutCartInput): Promise<CheckoutOutput> {
    const { clientId, address } = data;

    const [order, items, client] = await this.prisma.$transaction(
      async (tx) => {
        const cartItems = await tx.cartItem.findMany({
          where: { clientId },
          select: {
            quantity: true,
            product: {
              select: { id: true, name: true, description: true, price: true },
            },
          },
        });

        if (cartItems.length === 0) throw new Error("Cart is empty");

        const order = await tx.order.create({
          data: {
            clientId,
            address,
            status: OrderStatus.PAYMENT_REQUIRED,
            items: {
              createMany: {
                data: cartItems.map(({ product, quantity }) => ({
                  productId: product.id,
                  quantity,
                })),
              },
            },
          },
          select: {
            id: true,
            date: true,
            client: {
              select: { email: true },
            },
          },
        });

        await tx.cartItem.deleteMany({ where: { clientId } });

        return [order, cartItems, order.client];
      }
    );

    const checkout = await this.createCheckout({
      clientEmail: client.email,
      order,
      items: items.map(
        ({ product: { name, description, price }, quantity }) => ({
          name,
          description,
          price,
          quantity,
        })
      ),
    });
    if (checkout.url === null) throw new Error("Checkout url is null");

    return { orderId: order.id, checkoutLink: checkout.url };
  }

  async checkoutOrder(data: CheckoutOrderInput): Promise<CheckoutOutput> {
    const { orderId } = data;

    const { client, date } = await this.prisma.order.findFirstOrThrow({
      where: { id: orderId },
      select: {
        date: true,
        client: true,
        status: true,
      },
    });

    const items = await this.prisma.orderItem.findMany({
      where: { orderId },
      select: {
        product: {
          select: {
            name: true,
            description: true,
            priceHistory: {
              select: { price: true },
              where: {
                date: { lte: date },
              },
              orderBy: { date: "desc" },
              take: 1,
            },
          },
        },
        quantity: true,
      },
    });

    const checkout = await this.createCheckout({
      clientEmail: client.email,
      order: { id: orderId, date },
      items: items.map(
        ({ product: { name, description, priceHistory }, quantity }) => ({
          name,
          description,
          price: priceHistory[0].price,
          quantity,
        })
      ),
    });
    if (checkout.url === null) throw new Error("Checkout url is null");

    return { orderId, checkoutLink: checkout.url };
  }

  private async createCheckout(data: CreateCheckoutInput) {
    const { order, items, clientEmail } = data;

    return await this.stripe.checkout.sessions.create({
      line_items: items.map((item) => ({
        price_data: {
          product_data: {
            name: item.name,
            description: item.description,
          },
          unit_amount: item.price * 100,
          currency: "brl",
        },
        quantity: item.quantity,
      })),
      expires_at: Math.floor(order.date.valueOf() / 1000) + 31 * 60,
      customer_email: clientEmail,
      client_reference_id: order.id,
      mode: "payment",
      success_url: "http://localhost:8080/UwU",
    });
  }
}

export type CreateCheckoutInput = {
  items: {
    name: string;
    description: string;
    price: number;
    quantity: number;
  }[];
  order: {
    id: string;
    date: Date;
  };
  clientEmail: string;
};
