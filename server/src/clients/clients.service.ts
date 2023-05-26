import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { IClientsService, SignUpInput } from "./clients.interface";
import { HashService } from "src/auth";

@Injectable()
export class ClientsService implements IClientsService {
  constructor(private prisma: PrismaService, private hasher: HashService) {}

  async signUp(data: SignUpInput): Promise<void> {
    const { email, password, phoneNumber, username } = data;

    await this.prisma.client.create({
      data: {
        username,
        email,
        phoneNumber,
        passwordHash: await this.hasher.hashPassword(password),
      },
    });
  }
}
