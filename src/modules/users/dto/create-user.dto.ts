import { Gender } from '~modules/users/gender.enum';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(4)
  @MaxLength(15)
  login!: string;

  @MinLength(8)
  @MaxLength(50)
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
