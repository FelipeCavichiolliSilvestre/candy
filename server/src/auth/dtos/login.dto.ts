import { Type } from "class-transformer";
import { IsString, Length } from "class-validator";

export class LoginBodyDTO {
  @Type(() => String)
  @IsString()
  @Length(1, 20)
  public readonly username: string;

  @Type(() => String)
  @IsString()
  public readonly password: string;
}
