import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AllowUnauthenticated, IAuthService, JwtPayload } from "src/auth";
import { IClientsService } from "./clients.interface";
import { CreateClientBodyDTO } from "./dtos";
import { ClientLoginResponseDTO } from "../auth/dtos";
import { User } from "../auth/decorators";
import { SafeClientDTO } from "../shared/dtos";

@ApiTags("clients")
@Controller("/clients")
export class ClientsController {
  constructor(
    private clientsService: IClientsService,
    private authService: IAuthService
  ) {}

  @Get("/me")
  @ApiBearerAuth()
  async getMe(@User() user: JwtPayload): Promise<SafeClientDTO> {
    return await this.clientsService.findOne(user.id);
  }

  @Post("/")
  @AllowUnauthenticated()
  async create(
    @Body() body: CreateClientBodyDTO
  ): Promise<ClientLoginResponseDTO> {
    await this.clientsService.signUp(body);

    return this.authService.login(body.username, body.password, "client");
  }
}
