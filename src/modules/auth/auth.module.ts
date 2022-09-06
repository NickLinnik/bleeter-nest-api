import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '~modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '~modules/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {JwtStrategy} from "~modules/auth/jwt.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (congigService: ConfigService) => ({
        secret: congigService.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: congigService.getOrThrow('JWT_EXP') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
