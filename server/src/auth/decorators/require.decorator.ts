import { SetMetadata } from "@nestjs/common";
import { EmployeeRole } from "@prisma/client";

export const REQUIRED_ROLES_KEY = "REQUIRED_ROLES";
export function Require(...roles: EmployeeRole[]) {
  return SetMetadata(REQUIRED_ROLES_KEY, roles);
}
