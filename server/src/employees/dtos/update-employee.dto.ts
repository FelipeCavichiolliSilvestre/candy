import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, Length } from "class-validator";
import { EmployeeRole } from "@prisma/client";

export class UpdateEmployeeBodyDTO {
  @Type(() => String)
  @IsString()
  @IsOptional()
  @Length(3, 20)
  public readonly username?: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  @Length(6)
  public readonly password?: string;

  @Type(() => String)
  @IsEnum(EmployeeRole)
  @IsOptional()
  public readonly role?: EmployeeRole;
}
