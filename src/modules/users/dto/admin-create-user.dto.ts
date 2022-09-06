import {CreateUserDto} from "~modules/users/dto/create-user.dto";
import {IsBoolean, IsOptional} from "class-validator";

export class AdminCreateUserDto extends CreateUserDto {
    @IsOptional()
    @IsBoolean()
    admin?: boolean;
}
