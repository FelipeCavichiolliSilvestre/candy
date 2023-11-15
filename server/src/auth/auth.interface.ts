import { Client, Employee } from "@prisma/client";
import { UsersRole } from "./types";

export abstract class IAuthService {
  abstract login(
    username: string,
    password: string,
    type: "client"
  ): Promise<LoginOutput<Client>>;
  abstract login(
    username: string,
    password: string,
    type: "employee"
  ): Promise<LoginOutput<Employee>>;

  abstract authenticate(jwt: string): Promise<JwtPayload | null>;
}

export type LoginOutput<User extends Employee | Client> = Omit<
  User,
  "passwordHash"
> & {
  jwt: string;
};

export type JwtPayload = {
  id: string;
  role: UsersRole;
};
