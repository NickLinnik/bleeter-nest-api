import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '~modules/users/dto/create-user.dto';
import { UsersRepository } from '~modules/users/users.repository';
import { promisify } from 'util';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from '~modules/users/dto/update-user.dto';
import { UserEntity } from '~modules/users/user.entity';

@Injectable()
export class UsersService {
  private readonly passwordSaltRounds: number;
  private readonly hash = promisify(hash);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {
    this.passwordSaltRounds = Number(
      this.configService.getOrThrow('SALT_ROUNDS'),
    );
  }

  async findOne(login: string): Promise<UserEntity | null> {
    const userModel = await this.usersRepository.findOne(login);
    return userModel? new UserEntity(userModel.toJSON()) : null
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password, ...otherValues } = createUserDto;
    const userModel = await this.usersRepository.create({
      ...otherValues,
      password: await this.hashPassword(password),
    });
    return new UserEntity(userModel.toJSON())
  }

  async update(
    login: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    console.log('login:', login)
    console.log('updateUserDto:', updateUserDto)
    const newUpdateUserDto = Object.assign({}, updateUserDto);
    if (newUpdateUserDto.password) {
      newUpdateUserDto.password = await this.hashPassword(
        newUpdateUserDto.password,
      );
    }
    const userModel = await this.usersRepository.update(login, newUpdateUserDto);
    return new UserEntity(userModel.toJSON())
  }

  private async hashPassword(password: string): Promise<string> {
    return await this.hash(password, this.passwordSaltRounds);
  }
}
