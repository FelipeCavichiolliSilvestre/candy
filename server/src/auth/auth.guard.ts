import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { EmployeeRole } from "@prisma/client";
import { IAuthService } from "./auth.interface";
import { ALLOW_UNAUTHENTICATED_KEY, REQUIRED_ROLES_KEY } from "./decorators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: IAuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allow = this.reflector.get(
      ALLOW_UNAUTHENTICATED_KEY,
      context.getHandler()
    );
    if (allow) return true;

    const request = context.switchToHttp().getRequest();
    const jwt = request.headers?.authorization?.slice(7);

    const payload = await this.authService.authenticate(jwt);
    if (!payload) return false;
    (request as any).user = payload;

    const roles = this.reflector.get<EmployeeRole[]>(
      REQUIRED_ROLES_KEY,
      context.getHandler()
    );
    if (!roles) return true;

    return roles.some((role) => role === payload.role);
  }
}
