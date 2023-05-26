import { Type } from "class-transformer";
import { IsNumber, IsString, Length, Min } from "class-validator";

export class CreateProductBodyDTO {
  @Type(() => String)
  @IsString()
  @Length(3, 50)
  public readonly name: string;

  @Type(() => String)
  @IsString()
  @Length(0, 255)
  public readonly description: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  public readonly price: number;
}
