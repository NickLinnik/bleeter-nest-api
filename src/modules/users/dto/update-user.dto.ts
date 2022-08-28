import { Gender } from '~modules/users/gender.enum';
import {IsAscii, MaxLength, MinLength} from "class-validator";

export class UpdateUserDto {
  @MinLength(8)
  @MaxLength(50)
  @IsAscii()
  password?: string;

  @MinLength(1)
  @MaxLength(100)
  userName?: string;

  gender?: Gender;

  admin?: boolean;
}
