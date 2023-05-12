import { Controller } from "@nestjs/common";
import { IAuthService } from "./auth.interface";

@Controller("/")
export class AuthController {
  constructor(private authService: IAuthService) {}
}
