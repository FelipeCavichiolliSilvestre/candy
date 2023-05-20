import {
  BadRequestException,
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AllowUnauthenticated } from "src/auth";
import { PrismaService } from "src/prisma";

@Controller("/whatsapp")
export class WhatsappController {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService
  ) {}

  @Get("/webhooks")
  @AllowUnauthenticated()
  async verify(
    @Query("hub.challenge", ParseIntPipe) challenge: number,
    @Query("hub.verify_token") token: string
  ) {
    if (token !== this.configService.get("WAB_VERIFY_TOKEN"))
      throw new BadRequestException();

    return challenge;
  }

  @Post("/webhooks")
  @AllowUnauthenticated()
  async notify(@Body() body: any) {
    await this.prisma.whatsappHooks.create({
      data: { content: body },
    });
  }

  @Get("/notifications")
  async listNotifications() {
    return await this.prisma.whatsappHooks.findMany();
  }
}
