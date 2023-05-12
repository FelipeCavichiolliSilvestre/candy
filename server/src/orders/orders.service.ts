import { Injectable, Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { PrismaService } from "src/prisma";

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
}
