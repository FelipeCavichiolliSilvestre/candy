import { Injectable } from "@nestjs/common";
import { IAuthService, JwtPayload, LoginOutput } from "./auth.interface";
import { PrismaService } from "src/prisma";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService implements IAuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  // TODO: Handle errors
  async login(username: string, password: string): Promise<LoginOutput> {
    const employee = await this.prisma.employee.findUnique({
      where: { username },
    });
    if (employee === null) throw new Error("User not found");

    const passwordMatches = await bcrypt.compare(
      password,
      employee.passwordHash
    );
    if (!passwordMatches) throw new Error("Passwords don't match");

    const jwt = await this.jwtService.signAsync(
      { id: employee.id, role: employee.role } as JwtPayload,
      { expiresIn: "7d" }
    );

    const { passwordHash, ...safeEmployee } = employee;
    return { ...safeEmployee, jwt };
  }

  async authenticate(jwt: string): Promise<JwtPayload | null> {
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(jwt);
    } catch (error) {
      return null;
    }
  }
}
