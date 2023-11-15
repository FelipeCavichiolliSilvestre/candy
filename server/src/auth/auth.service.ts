import { Injectable } from "@nestjs/common";
import { IAuthService, JwtPayload, LoginOutput } from "./auth.interface";
import { PrismaService } from "src/prisma";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";
import { UsersRole } from "./types";
import { Client, Employee } from "@prisma/client";

@Injectable()
export class AuthService implements IAuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  // TODO: Handle errors
  login(
    username: string,
    password: string,
    type: "client"
  ): Promise<LoginOutput<Client>>;
  login(
    username: string,
    password: string,
    type: "employee"
  ): Promise<LoginOutput<Employee>>;
  async login(
    username: string,
    password: string,
    type: "client" | "employee"
  ): Promise<LoginOutput<Client | Employee>> {
    const isClient = type === "client";

    const user = isClient
      ? await this.findClient(username)
      : await this.findEmployee(username);
    if (user === null) throw new Error("User not found");

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) throw new Error("Passwords don't match");

    const jwt = await this.jwtService.signAsync(
      {
        id: user.id,
        role: isClient ? UsersRole.CLIENT : (user as Employee).role,
      } as JwtPayload,
      { expiresIn: "7d" }
    );

    const { passwordHash, ...safeUser } = user;
    return { ...safeUser, jwt };
  }

  private async findEmployee(username: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { username },
    });

    return employee;
  }

  private async findClient(username: string) {
    const employee = await this.prisma.client.findUnique({
      where: { username },
    });

    return employee;
  }

  async authenticate(jwt: string): Promise<JwtPayload | null> {
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(jwt);
    } catch (error) {
      return null;
    }
  }
}
