import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { IOrdersService } from "./orders.interface";
import { OrderStatus } from "@prisma/client";

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(private prisma: PrismaService) {}

  async confirmPayment(orderId: string) {
    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.PAID },
    });
  }
}
