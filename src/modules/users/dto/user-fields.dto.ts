import { MaxLength, MinLength } from 'class-validator';

export class UserLoginDto {
  @MinLength(4)
  @MaxLength(15)
  login!: string;
}

export class UserPasswordDto {
  @MinLength(8)
  @MaxLength(50)
  password!: string;
}
