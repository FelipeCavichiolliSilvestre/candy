import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class GetEmployeesQueryDTO {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(0)
  page?: number;
}
