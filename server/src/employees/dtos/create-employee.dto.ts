import { Type } from "class-transformer";
import { IsEnum, IsString, Length } from "class-validator";
import { EmployeeRole } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeeBodyDTO {
  @Type(() => String)
  @IsString()
  @Length(3, 20)
  public readonly username: string;

  @Type(() => String)
  @IsString()
  @Length(6)
  public readonly password: string;

  @Type(() => String)
  @IsEnum(EmployeeRole)
  @ApiProperty({ type: "string", enum: EmployeeRole })
  public readonly role: EmployeeRole;
}
