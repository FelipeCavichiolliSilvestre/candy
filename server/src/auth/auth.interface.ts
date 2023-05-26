import { Client, Employee } from "@prisma/client";
import { UsersRole } from "./types";

export abstract class IAuthService {
  abstract login(
    username: string,
    password: string,
    type: "client" | "employee"
  ): Promise<LoginOutput>;
  abstract authenticate(jwt: string): Promise<JwtPayload | null>;
}

export type LoginOutput = Omit<Employee | Client, "passwordHash"> & {
  jwt: string;
};

export type JwtPayload = {
  id: string;
  role: UsersRole;
};
