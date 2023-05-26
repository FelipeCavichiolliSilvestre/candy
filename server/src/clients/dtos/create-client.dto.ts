import { Type } from "class-transformer";
import { IsEmail, IsPhoneNumber, IsString, Length } from "class-validator";

export class CreateClientBodyDTO {
  @Type(() => String)
  @IsString()
  @Length(3, 60)
  public readonly username: string;

  @Type(() => String)
  @IsString()
  @IsEmail()
  public readonly email: string;

  @Type(() => String)
  @IsString()
  @IsPhoneNumber("BR")
  public readonly phoneNumber: string;

  @Type(() => String)
  @IsString()
  @Length(6)
  public readonly password: string;
}
