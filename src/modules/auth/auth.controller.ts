import {
  Controller,
  Req,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from '~modules/auth/local-auth.guard';
import { AuthService } from '~modules/auth/auth.service';
import { AuthRequest } from '~modules/auth/auth-request.interface';
import { CreateUserDto } from '~modules/users/dto/create-user.dto';
import { UserEntity } from '~modules/users/user.entity';
import { UniqueLoginViolationError } from '~modules/users/users.errors/users.app-erros';
import { UniqueLoginViolationHttpException } from '~modules/users/users.errors/users.http-errors';
import { UsersService } from '~modules/users/users.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.create(createUserDto).catch((error) => {
      if (error instanceof UniqueLoginViolationError) {
        throw new UniqueLoginViolationHttpException();
      } else throw new Error();
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
