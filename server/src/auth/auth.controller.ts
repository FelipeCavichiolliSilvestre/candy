import { Body, Controller, Post } from "@nestjs/common";
import { IAuthService } from "./auth.interface";
import { AllowUnauthenticated } from "./decorators";
import {
  ClientLoginResponseDTO,
  EmployeeLoginResponseDTO,
  EmployeeLoginBodyDTO,
  ClientLoginBodyDTO,
} from "./dtos";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("/")
export class AuthController {
  constructor(private authService: IAuthService) {}

  @Post("/employees/login")
  @AllowUnauthenticated()
  async employeeLogin(
    @Body() body: EmployeeLoginBodyDTO
  ): Promise<EmployeeLoginResponseDTO> {
    return this.authService.login(body.username, body.password, "employee");
  }

  @Post("/clients/login")
  @AllowUnauthenticated()
  async clientLogin(
    @Body() body: ClientLoginBodyDTO
  ): Promise<ClientLoginResponseDTO> {
    return this.authService.login(body.email, body.password, "client");
  }
}
