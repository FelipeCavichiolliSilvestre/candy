import { IsString, Length } from "class-validator";

export class CheckoutCartBodyDTO {
  @IsString()
  @Length(10)
  address: string;
}
