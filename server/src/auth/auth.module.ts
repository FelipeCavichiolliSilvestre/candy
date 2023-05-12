import { Global, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { IAuthService } from "./auth.interface";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

@Global()
@Module({
  controllers: [AuthController],
  providers: [{ provide: IAuthService, useClass: AuthService }, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
