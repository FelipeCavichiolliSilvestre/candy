import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";
import { ListProductsOutput } from "../products.interface";
import { ProductDTO } from "../../shared/dtos";

export class GetProductsQueryDTO {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(0)
  page?: number;
}

export class GetProductsResponseDTO implements ListProductsOutput {
  hasNextPage: boolean;
  products: ProductDTO[];
}
