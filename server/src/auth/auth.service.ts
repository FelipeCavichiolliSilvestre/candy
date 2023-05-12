import { Injectable } from "@nestjs/common";
import { IAuthService } from "./auth.interface";
import { PrismaService } from "src/prisma";

@Injectable()
export class AuthService implements IAuthService {
  constructor(private prisma: PrismaService) {}
}
