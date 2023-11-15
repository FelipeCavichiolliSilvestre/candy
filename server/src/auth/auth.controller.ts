import { Body, Controller, Post } from "@nestjs/common";
import { IAuthService } from "./auth.interface";
import { AllowUnauthenticated } from "./decorators";
import {
  ClientLoginResponseDTO,
  EmployeeLoginResponseDTO,
  LoginBodyDTO,
} from "./dtos";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("/")
export class AuthController {
  constructor(private authService: IAuthService) {}

  @Post("/employees/login")
  @AllowUnauthenticated()
  async employeeLogin(
    @Body() body: LoginBodyDTO
  ): Promise<EmployeeLoginResponseDTO> {
    return this.authService.login(body.username, body.password, "employee");
  }

  @Post("/clients/login")
  @AllowUnauthenticated()
  async clientLogin(
    @Body() body: LoginBodyDTO
  ): Promise<ClientLoginResponseDTO> {
    return this.authService.login(body.username, body.password, "client");
  }
}
