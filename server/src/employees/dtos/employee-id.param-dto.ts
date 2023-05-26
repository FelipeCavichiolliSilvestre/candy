import { Type } from "class-transformer";
import { IsUUID } from "class-validator";

export class EmployeeIdParamDTO {
  @Type(() => String)
  @IsUUID()
  employeeId: string;
}
