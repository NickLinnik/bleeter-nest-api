import {
  Body, ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query, UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '~modules/users/users.service';
import { CreateUserDto } from '~modules/users/dto/create-user.dto';
import { UserModel } from '~modules/users/users.model';
import { UpdateUserDto } from '~modules/users/dto/update-user.dto';
import {
  UniqueLoginViolationHttpException,
  UserByLoginNotFoundHttpException,
} from '~modules/users/users.errors/users.http-errors';
import {
  UniqueLoginViolationError,
  UserByLoginNotFoundError,
} from '~modules/users/users.errors/users.app-erros';
import { UserLoginDto } from '~modules/users/dto/user-login.dto';
import {ReturnUserDto} from "~modules/users/dto/return-user.dto";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':login')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUser(@Param() userLoginDto: UserLoginDto): Promise<ReturnUserDto> {
    const user = await this.usersService.findOne(userLoginDto);
    if (!user) throw new UserByLoginNotFoundHttpException();
    console.log(user)
    return user;
  }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async registerUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    return await this.usersService
        .create(createUserDto)
        .catch((error) => {
      if (error instanceof UniqueLoginViolationError) {
        throw new UniqueLoginViolationHttpException();
      } else throw new Error();
    });
  }

  @Put('update/:login')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @Param() login: UserLoginDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReturnUserDto> {
    return await this.usersService
      .update(login, updateUserDto)
      .catch((error) => {
        if (error instanceof UserByLoginNotFoundError) {
          throw new UserByLoginNotFoundHttpException();
        } else throw new Error();
      });
  }
}
