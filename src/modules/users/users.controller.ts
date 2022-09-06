import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from '~modules/users/users.service';
import { UpdateUserDto } from '~modules/users/dto/update-user.dto';
import {
  UniqueLoginViolationHttpException,
  UserByLoginNotFoundHttpException,
} from '~modules/users/users.errors/users.http-errors';
import {
  UniqueLoginViolationError,
  UserByLoginNotFoundError,
} from '~modules/users/users.errors/users.app-erros';
import { UserEntity } from '~modules/users/user.entity';
import { JwtAuthGuard } from '~modules/auth/jwt-auth.guard';
import { AdminCreateUserDto } from '~modules/users/dto/admin-create-user.dto';
import { AuthRequest } from '~modules/auth/auth-request.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':login')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUser(@Param('login') login: string): Promise<UserEntity> {
    const user = await this.usersService.findOne(login);
    if (!user) throw new UserByLoginNotFoundHttpException();
    console.log(user);
    return user;
  }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async registerAdmin(
    @Body() createAdminDto: AdminCreateUserDto,
  ): Promise<UserEntity> {
    return await this.usersService.create(createAdminDto).catch((error) => {
      if (error instanceof UniqueLoginViolationError) {
        throw new UniqueLoginViolationHttpException();
      } else throw new Error();
    });
  }

  @Put('update/:login')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @Param('login') login: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.usersService
      .update(login, updateUserDto)
      .catch((error) => {
        if (error instanceof UserByLoginNotFoundError) {
          throw new UserByLoginNotFoundHttpException();
        } else throw new Error();
      });
  }

  @Put('update-self')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateSelf(
    @Req() req: AuthRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.usersService
      .update(req.user.login, updateUserDto)
      .catch((error) => {
        if (error instanceof UserByLoginNotFoundError) {
          throw new UserByLoginNotFoundHttpException();
        } else throw new Error();
      });
  }
}
