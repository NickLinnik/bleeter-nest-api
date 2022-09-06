import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '~modules/users/user.entity';
import { compare } from 'bcrypt';

import { UsersService } from '~modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    login: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.findOne(login);
    if (!user) return null;
    return (await compare(password, user.password)) ? user : null;
  }

  async login(user: UserEntity) {
    const payload = { login: user.login };
    return { access_token: this.jwtService.sign(payload) };
  }
}
