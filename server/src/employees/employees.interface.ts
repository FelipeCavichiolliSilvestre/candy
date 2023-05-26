import { Injectable } from "@nestjs/common";
import { EmployeeRole } from "@prisma/client";
import { SafeEmployee } from "./safe-employee.type";

@Injectable()
export abstract class IEmployeesService {
  abstract register(data: RegisterEmployeeInput): Promise<SafeEmployee>;
  abstract update(data: UpdateEmployeeInput): Promise<SafeEmployee>;
  abstract list(page?: number): Promise<ListEmployeesOutput>;
  abstract findOne(id: string): Promise<SafeEmployee>;
  abstract remove(id: string): Promise<void>;
}

export type RegisterEmployeeInput = {
  username: string;
  password: string;
  role: EmployeeRole;
};

export type UpdateEmployeeInput = Partial<RegisterEmployeeInput> & {
  employeeId: string;
};

export type ListEmployeesOutput = {
  employees: SafeEmployee[];
  hasNextPage: boolean;
};
