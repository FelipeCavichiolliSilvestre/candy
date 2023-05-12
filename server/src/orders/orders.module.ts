import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { IOrdersService } from "./orders.interface";
import { OrdersService } from "./orders.service";

@Module({
  controllers: [OrdersController],
  providers: [{ provide: IOrdersService, useClass: OrdersService }],
})
export class OrdersModule {}
