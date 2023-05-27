import { Module } from "@nestjs/common";
import { ICartsService } from "./carts.interface";
import { CartsService } from "./carts.service";
import { CartsController } from "./carts.controller";

@Module({
  controllers: [CartsController],
  providers: [{ provide: ICartsService, useClass: CartsService }],
  exports: [ICartsService],
})
export class CartsModule {}
