import { Type } from "class-transformer";
import { IsString, Length } from "class-validator";

export class UpdateProductInfoBodyDTO {
  @Type(() => String)
  @IsString()
  @Length(3, 50)
  public readonly name: string;

  @Type(() => String)
  @IsString()
  @Length(0, 255)
  public readonly description: string;
}
