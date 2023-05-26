import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import {
  RegisterEmployeeInput,
  IEmployeesService,
  ListEmployeesOutput,
  UpdateEmployeeInput,
} from "./employees.interface";
import { SafeEmployee } from "./safe-employee.type";
import { HashService } from "src/auth/hash.service";

@Injectable()
export class EmployeesService implements IEmployeesService {
  constructor(private prisma: PrismaService, private hasher: HashService) {}

  async register(data: RegisterEmployeeInput): Promise<SafeEmployee> {
    const { username, password, role } = data;

    // TODO: Handle unique constraint error
    const newEmployee = await this.prisma.employee.create({
      data: {
        username,
        passwordHash: await this.hasher.hashPassword(password),
        role,
      },
      select: { id: true, role: true, username: true },
    });

    return newEmployee;
  }

  async update(data: UpdateEmployeeInput): Promise<SafeEmployee> {
    const { employeeId, username, password, role } = data;

    // TODO: Handle unique constraint error
    const newEmployee = await this.prisma.employee.update({
      where: { id: employeeId },
      data: {
        username,
        passwordHash: await this.hasher.hashPassword(password),
        role,
      },
      select: { id: true, role: true, username: true },
    });

    return newEmployee;
  }

  async list(page?: number): Promise<ListEmployeesOutput> {
    const employees = await this.prisma.employee.findMany({
      select: { id: true, username: true, role: true },
      skip: (page ?? 0) * 10,
      // takes n + 1 elements to check if there are more items
      // after current page
      take: 10 + 1,
    });

    const hasNextPage = employees.length === 11;
    employees.splice(10, 1);

    return {
      employees,
      hasNextPage,
    };
  }

  async findOne(employeeId: string): Promise<SafeEmployee> {
    // TODO: Handle not found error
    return await this.prisma.employee.findUniqueOrThrow({
      where: { id: employeeId },
      select: { id: true, username: true, role: true },
    });
  }

  async remove(employeeId: string): Promise<void> {
    await this.prisma.employee.delete({ where: { id: employeeId } });
  }
}
