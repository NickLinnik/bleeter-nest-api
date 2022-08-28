import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserModel } from '~modules/users/users.model';
import { CreateUserDto } from '~modules/users/dto/create-user.dto';
import { UpdateUserDto } from '~modules/users/dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
  ) {}

  async findOne(login: string): Promise<UserModel | null> {
    return await this.userModel.findOne({ where: { login } });
  }

  // TODO add unique constraint violation on login handling
  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    return await this.userModel.create(createUserDto);
  }

  async update(
    user: UserModel,
    updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    return await user.update(updateUserDto);
  }
}
