import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class GetProductsQueryDTO {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(0)
  page?: number;
}
