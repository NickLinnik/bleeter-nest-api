import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from '~modules/users/gender.enum';

export class UserEntity {
  @MinLength(4)
  @MaxLength(15)
  login!: string;

  @MinLength(8)
  @MaxLength(50)
  @Exclude()
  password!: string;

  @MinLength(1)
  @MaxLength(100)
  @IsOptional()
  userName?: string;

  @IsEnum(Gender)
  gender: Gender = Gender.Unspecified;

  @IsBoolean()
  admin: boolean = false;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
