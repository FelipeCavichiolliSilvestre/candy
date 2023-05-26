import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { IProductsService } from "./products.interface";
import {
  CreateProductBodyDTO,
  GetProductsQueryDTO,
  ProductIdParamDTO,
  UpdateProductInfoBodyDTO,
  UpdateProductPriceDTO,
  UpdateProductQuantityDTO,
} from "./dtos";
import { Require } from "src/auth";
import { EmployeeRole } from "@prisma/client";
import { ApiTags } from "@nestjs/swagger";

@Controller("/products")
@ApiTags("products")
export class ProductsController {
  constructor(private productsService: IProductsService) {}

  @Get("/")
  async getProduct(@Query() query: GetProductsQueryDTO) {
    return await this.productsService.list(query.page);
  }

  @Post("/")
  @Require(EmployeeRole.COOK)
  async createProduct(@Body() body: CreateProductBodyDTO) {
    await this.productsService.register(body);
  }

  @Put("/:productId/info")
  @Require(EmployeeRole.COOK)
  async updateProductInfo(
    @Param() param: ProductIdParamDTO,
    @Body() body: UpdateProductInfoBodyDTO
  ) {
    await this.productsService.updateInfo({ ...param, ...body });
  }

  @Put("/:productId/price")
  @Require(EmployeeRole.COOK)
  async updateProductPrice(
    @Param() param: ProductIdParamDTO,
    @Body() body: UpdateProductPriceDTO
  ) {
    await this.productsService.updatePrice({ ...param, ...body });
  }

  @Put("/:productId/quantity")
  @Require(EmployeeRole.COOK)
  async updateProductQuantity(
    @Param() param: ProductIdParamDTO,
    @Body() body: UpdateProductQuantityDTO
  ) {
    await this.productsService.updateStock({ ...param, ...body });
  }
}
