import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

@Injectable()
export class HashService {
  constructor(private configService: ConfigService) {}

  public hashPassword(password: string): Promise<string>;
  public hashPassword(password: undefined): Promise<undefined>;
  public hashPassword(
    password: string | undefined
  ): Promise<string | undefined>;
  public async hashPassword(
    password: string | undefined
  ): Promise<string | undefined> {
    if (!password) return undefined;

    return await bcrypt.hash(
      password,
      Number(this.configService.getOrThrow("SALT_ROUNDS"))
    );
  }
}
