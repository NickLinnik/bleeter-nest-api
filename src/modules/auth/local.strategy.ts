import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '~modules/auth/auth.service';
import { UserEntity } from '~modules/users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField: 'login'});
  }

  async validate(
    login: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.authService.validateUser(login, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
