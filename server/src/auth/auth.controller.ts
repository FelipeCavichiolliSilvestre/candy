import { Body, Controller, Post } from "@nestjs/common";
import { IAuthService } from "./auth.interface";
import { AllowUnauthenticated } from "./decorators";
import { LoginBodyDTO } from "./dtos";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("/")
export class AuthController {
  constructor(private authService: IAuthService) {}

  @ApiTags("employees")
  @Post("/employees/login")
  @AllowUnauthenticated()
  async employeeLogin(@Body() body: LoginBodyDTO) {
    return this.authService.login(body.username, body.password, "employee");
  }

  @ApiTags("clients")
  @Post("/clients/login")
  @AllowUnauthenticated()
  async clientLogin(@Body() body: LoginBodyDTO) {
    return this.authService.login(body.username, body.password, "client");
  }
}
