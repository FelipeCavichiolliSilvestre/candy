import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { IAuthService } from "./auth.interface";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory(configService: ConfigService) {
        return {
          secret: configService.getOrThrow("JWT_SECRET"),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [{ provide: IAuthService, useClass: AuthService }, AuthGuard],
  exports: [IAuthService, AuthGuard],
})
export class AuthModule {}
