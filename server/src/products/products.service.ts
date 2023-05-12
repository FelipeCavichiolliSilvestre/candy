import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
}
