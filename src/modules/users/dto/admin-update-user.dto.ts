import {
  IsBoolean,
  IsOptional,
} from 'class-validator';
import {UpdateUserDto} from "~modules/users/dto/update-user.dto";

export class AdminUpdateUserDto extends UpdateUserDto {
  @IsOptional()
  @IsBoolean()
  admin?: boolean;
}
