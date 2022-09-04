import { Exclude } from 'class-transformer';
import {IsAscii, IsBoolean, IsEnum, IsOptional, MaxLength, MinLength, IsDate} from "class-validator";
import {Gender} from "~modules/users/gender.enum";

export class ReturnUserDto {
    @MinLength(4)
    @MaxLength(15)
    @IsAscii()
    login!: string;

    @MinLength(8)
    @MaxLength(50)
    @IsAscii()
    @Exclude()
    password!: string;

    @MinLength(1)
    @MaxLength(100)
    @IsOptional()
    userName?: string;

    @IsEnum(Gender)
    gender!: Gender;

    @IsBoolean()
    admin!: boolean;

    @IsDate()
    createdAt!: Date;

    @IsDate()
    updatedAt!: Date;

    constructor(partial: Partial<ReturnUserDto>) {
        Object.assign(this, partial);
    }
}
