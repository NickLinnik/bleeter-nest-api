import { Injectable } from '@nestjs/common';
import { UsersService } from '~modules/users/users.service';
import {
  UserLoginDto,
  UserPasswordDto,
} from '~modules/users/dto/user-fields.dto';
import { ReturnUserDto } from '~modules/users/dto/return-user.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    login: string,
    password: string,
  ): Promise<ReturnUserDto | null> {
    const user = await this.usersService.findOne(login);
    if (!user) return null
    return await compare(password, user.password) ? user : null;
  }
}
