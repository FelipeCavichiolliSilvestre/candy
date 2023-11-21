import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { IProductsService } from "./products.interface";
import {
  CreateProductBodyDTO,
  GetProductsQueryDTO,
  GetProductsResponseDTO,
  ProductIdParamDTO,
  UpdateProductInfoBodyDTO,
  UpdateProductPriceDTO,
  UpdateProductQuantityDTO,
} from "./dtos";
import { AllowUnauthenticated, Require } from "src/auth";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersRole } from "src/auth/types";
import { ProductDTO } from "../shared/dtos";

@Controller("/products")
@ApiTags("products")
export class ProductsController {
  constructor(private productsService: IProductsService) {}

  @Get("/")
  @AllowUnauthenticated()
  async listProducts(
    @Query() query: GetProductsQueryDTO
  ): Promise<GetProductsResponseDTO> {
    return await this.productsService.list(query.page);
  }

  @Get("/:productId")
  @AllowUnauthenticated()
  async getProduct(
    @Param("productId", ParseIntPipe) productId: number
  ): Promise<ProductDTO> {
    return await this.productsService.getOne(productId);
  }

  @Post("/")
  @Require(UsersRole.COOK)
  @ApiBearerAuth()
  async createProduct(@Body() body: CreateProductBodyDTO): Promise<ProductDTO> {
    return await this.productsService.register(body);
  }

  @Put("/:productId/info")
  @Require(UsersRole.COOK)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  async updateProductInfo(
    @Param() param: ProductIdParamDTO,
    @Body() body: UpdateProductInfoBodyDTO
  ) {
    await this.productsService.updateInfo({ ...param, ...body });
  }

  @Put("/:productId/price")
  @Require(UsersRole.COOK)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  async updateProductPrice(
    @Param() param: ProductIdParamDTO,
    @Body() body: UpdateProductPriceDTO
  ) {
    await this.productsService.updatePrice({ ...param, ...body });
  }

  @Put("/:productId/quantity")
  @Require(UsersRole.COOK)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  async updateProductQuantity(
    @Param() param: ProductIdParamDTO,
    @Body() body: UpdateProductQuantityDTO
  ) {
    await this.productsService.updateStock({ ...param, ...body });
  }
}
