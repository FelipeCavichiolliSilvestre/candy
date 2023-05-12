import { PrismaService } from "src/prisma";
import { IEmployeesService } from "./employees.interface";

export class EmployeesService implements IEmployeesService {
  constructor(private prisma: PrismaService) {}
}
