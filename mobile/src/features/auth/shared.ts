import { SafeClientDTO } from "../../api";

export const JWT_KEY = "JWT";

export type AuthState = {
  status:
    | "pending"
    | "disconnecting"
    | "disconnected"
    | "authenticated"
    | "authenticating";
  user: null | (SafeClientDTO & { jwt: string });
};
