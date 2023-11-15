import { Type } from "class-transformer";
import { IsString, Length } from "class-validator";
import { LoginOutput } from "../auth.interface";
import { Client, Employee, EmployeeRole } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class LoginBodyDTO {
  @Type(() => String)
  @IsString()
  @Length(1, 20)
  public readonly username: string;

  @Type(() => String)
  @IsString()
  public readonly password: string;
}

export class EmployeeLoginResponseDTO implements LoginOutput<Employee> {
  id: string;
  @ApiProperty({ type: "string", enum: EmployeeRole })
  role: EmployeeRole;
  username: string;
  jwt: string;
}

export class ClientLoginResponseDTO implements LoginOutput<Client> {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  jwt: string;
}
