import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class EmployeeIdParamDTO {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  id: number;
}
