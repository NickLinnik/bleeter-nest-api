import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '~modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '~modules/auth/local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
