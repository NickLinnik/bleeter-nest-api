import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '~modules/users/users.service';
import { CreateUserDto } from '~modules/users/dto/create-user.dto';
import { UserModel } from '~modules/users/users.model';
import { UpdateUserDto } from '~modules/users/dto/update-user.dto';
import { UserByLoginNotFoundHttpException } from '~modules/users/users.errors/users.http-errors';
import { UserByLoginNotFoundError } from '~modules/users/users.errors/users.app-erros';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':login')
  async getUser(@Param('login') login: string): Promise<UserModel> {
    const user = await this.usersService.findOne(login);
    if (!user) throw new UserByLoginNotFoundHttpException();
    return user;
  }

  // TODO enable validation
  @Post('register')
  // @UsePipes(new ValidationPipe({ transform: true }))
  async registerUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserModel | null> {
    return this.usersService.create(createUserDto);
  }

  // TODO enable validation
  @Put('update/:login')
  // @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @Param('login') login: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.usersService.update(login, updateUserDto).catch((err) => {
      if (err instanceof UserByLoginNotFoundError) {
        throw new UserByLoginNotFoundHttpException();
      } else throw new Error();
    });
  }
}
