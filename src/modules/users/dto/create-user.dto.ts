import { Gender } from '~modules/users/gender.enum';
import {IsAscii, IsBoolean, IsEnum, IsOptional, MaxLength, MinLength} from 'class-validator';

export class CreateUserDto {
  @MinLength(4)
  @MaxLength(15)
  @IsAscii()
  login!: string;

  @MinLength(8)
  @MaxLength(50)
  @IsAscii()
  password!: string;

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
