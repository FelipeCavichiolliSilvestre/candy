import { CanActivate, ExecutionContext } from "@nestjs/common";
import { IAuthService } from "./auth.interface";

export class AuthGuard implements CanActivate {
  constructor(private authService: IAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
