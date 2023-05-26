import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class ProductIdParamDTO {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  productId: number;
}
