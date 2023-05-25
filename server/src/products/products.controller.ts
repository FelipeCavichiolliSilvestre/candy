import { Controller, Get, Post, Put } from "@nestjs/common";
import { IProductsService } from "./products.interface";

@Controller("/products")
export class ProductsController {
  constructor(private productsService: IProductsService) {}

  @Get("/")
  async getProduct() {}

  @Post("/")
  async createProduct() {}

  @Put("/:productId/info")
  async updateProductInfo() {}

  @Put("/:productId/price")
  async updateProductPrice() {}

  @Put("/:productId/quantity")
  async updateProductQuantity() {}
}
