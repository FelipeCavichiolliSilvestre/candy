import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";
import { SafeEmployeeDTO } from "../../shared/dtos";

export class GetEmployeesQueryDTO {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(0)
  page?: number;
}

export class GetEmployeesResponseDTO {
  employees: SafeEmployeeDTO[];
  hasNextPage: boolean;
}
