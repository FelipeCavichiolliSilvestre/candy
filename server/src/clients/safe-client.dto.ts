import { Client } from "@prisma/client";

export type SafeClient = Omit<Client, "passwordHash">;
