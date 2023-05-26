import { SetMetadata } from "@nestjs/common";
import { UsersRole } from "../types";

export const REQUIRED_ROLES_KEY = "REQUIRED_ROLES";
export function Require(...roles: UsersRole[]) {
  return SetMetadata(REQUIRED_ROLES_KEY, roles);
}
