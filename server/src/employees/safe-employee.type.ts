import { Employee } from "@prisma/client";

export type SafeEmployee = Omit<Employee, "passwordHash">;
