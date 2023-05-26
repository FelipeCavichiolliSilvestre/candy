import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class UpdateProductPriceDTO {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  public readonly value: number;
}
