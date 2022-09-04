import { Gender } from '~modules/users/gender.enum';
import {IsAscii, IsBoolean, IsEnum, IsOptional, MaxLength, MinLength} from "class-validator";

export class UpdateUserDto {
  @MinLength(8)
  @MaxLength(50)
  @IsAscii()
  @IsOptional()
  password?: string;

  @MinLength(1)
  @MaxLength(100)
  @IsOptional()
  userName?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsBoolean()
  admin?: boolean;
}
