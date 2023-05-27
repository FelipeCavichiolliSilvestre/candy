import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class UpdateClientBodyDTO {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  productId: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  quantity: number;
}
