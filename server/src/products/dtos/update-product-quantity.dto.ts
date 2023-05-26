import { AdjustmentType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsInt } from "class-validator";

export class UpdateProductQuantityDTO {
  @Type(() => Number)
  @IsInt()
  public readonly value: number;

  @Type(() => String)
  @IsEnum(AdjustmentType)
  public readonly type: AdjustmentType;
}
