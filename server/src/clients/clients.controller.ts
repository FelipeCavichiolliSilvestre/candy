import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AllowUnauthenticated } from "src/auth";
import { IClientsService } from "./clients.interface";
import { CreateClientBodyDTO } from "./dtos";

@ApiTags("clients")
@Controller("/clients")
export class ClientsController {
  constructor(private clientsService: IClientsService) {}

  @Post("/")
  @AllowUnauthenticated()
  async create(@Body() body: CreateClientBodyDTO) {
    return await this.clientsService.signUp(body);
  }
}
