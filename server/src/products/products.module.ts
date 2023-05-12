import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { IProductsService } from "./products.interface";

@Module({
  controllers: [ProductsController],
  providers: [{ provide: IProductsService, useClass: ProductsService }],
})
export class ProductsModule {}
