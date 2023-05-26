import { Module } from "@nestjs/common";
import { ClientsController } from "./clients.controller";
import { IClientsService } from "./clients.interface";
import { ClientsService } from "./clients.service";

@Module({
  controllers: [ClientsController],
  providers: [{ provide: IClientsService, useClass: ClientsService }],
})
export class ClientsModule {}
