import {IsAscii, MaxLength, MinLength} from 'class-validator';

export class UserLoginDto {
    @MinLength(4)
    @MaxLength(15)
    @IsAscii()
    login!: string;
}
