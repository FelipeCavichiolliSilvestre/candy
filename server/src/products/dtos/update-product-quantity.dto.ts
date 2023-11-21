import { AdjustmentType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductQuantityDTO {
  @Type(() => Number)
  @IsInt()
  public readonly value: number;

  @Type(() => String)
  @IsEnum(AdjustmentType)
  @ApiProperty({ type: "string", enum: AdjustmentType })
  public readonly type: AdjustmentType;
}
