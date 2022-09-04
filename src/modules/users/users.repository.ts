import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserModel } from '~modules/users/users.model';
import { CreateUserDto } from '~modules/users/dto/create-user.dto';
import { UpdateUserDto } from '~modules/users/dto/update-user.dto';
import { UserLoginDto } from '~modules/users/dto/user-login.dto';
import {UniqueLoginViolationError, UserByLoginNotFoundError} from '~modules/users/users.errors/users.app-erros';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
  ) {}

  async findOne(login: UserLoginDto): Promise<UserModel | null> {
    return await this.userModel.findOne({ where: { login: login.login } });
  }

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    return await this.userModel.create(createUserDto).catch((error) => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new UniqueLoginViolationError();
      } else throw new Error();
    });
  }

  async update(
    userLoginDto: UserLoginDto,
    updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    const queryResult = await UserModel.update(updateUserDto, {
      where: { login: userLoginDto.login },
      returning: true
    });
    const users = queryResult[1]
    if (!users.length) throw new UserByLoginNotFoundError()
    return users[0]
  }
}
