import { Controller } from "@nestjs/common";
import { IProductsService } from "./products.interface";

@Controller("/products")
export class ProductsController {
  constructor(private productsService: IProductsService) {}
}
