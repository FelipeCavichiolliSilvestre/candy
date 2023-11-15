import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AllowUnauthenticated, IAuthService } from "src/auth";
import { IClientsService } from "./clients.interface";
import { CreateClientBodyDTO } from "./dtos";
import { ClientLoginResponseDTO } from "../auth/dtos";

@ApiTags("clients")
@Controller("/clients")
export class ClientsController {
  constructor(
    private clientsService: IClientsService,
    private authService: IAuthService
  ) {}

  @Post("/")
  @AllowUnauthenticated()
  async create(
    @Body() body: CreateClientBodyDTO
  ): Promise<ClientLoginResponseDTO> {
    await this.clientsService.signUp(body);

    return this.authService.login(body.username, body.password, "client");
  }
}
