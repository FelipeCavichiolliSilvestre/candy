import { Employee, EmployeeRole } from "@prisma/client";

export abstract class IAuthService {
  abstract login(username: string, password: string): Promise<LoginOutput>;
  abstract authenticate(jwt: string): Promise<JwtPayload | null>;
}

export type LoginOutput = Omit<Employee, "passwordHash"> & { jwt: string };

export type JwtPayload = {
  id: number;
  role: EmployeeRole;
};
