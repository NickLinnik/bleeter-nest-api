import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '~modules/users/dto/create-user.dto';
import { UsersRepository } from '~modules/users/users.repository';
import { UserModel } from '~modules/users/users.model';
import { promisify } from 'util';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from '~modules/users/dto/update-user.dto';
import { UserLoginDto } from '~modules/users/dto/user-login.dto';
import { ReturnUserDto } from '~modules/users/dto/return-user.dto';

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

  async findOne(login: UserLoginDto): Promise<ReturnUserDto | null> {
    const userModel = await this.usersRepository.findOne(login);
    return userModel? new ReturnUserDto(userModel.toJSON()) : null
  }

  async create(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const { password, ...otherValues } = createUserDto;
    const userModel = await this.usersRepository.create({
      ...otherValues,
      password: await this.hashPassword(password),
    });
    return new ReturnUserDto(userModel.toJSON())
  }

  async update(
    login: UserLoginDto,
    updateUserDto: UpdateUserDto,
  ): Promise<ReturnUserDto> {
    const newUpdateUserDto = Object.assign({}, updateUserDto);
    if (newUpdateUserDto.password) {
      newUpdateUserDto.password = await this.hashPassword(
        newUpdateUserDto.password,
      );
    }
    const userModel = await this.usersRepository.update(login, newUpdateUserDto);
    return new ReturnUserDto(userModel.toJSON())
  }

  private async hashPassword(password: string): Promise<string> {
    return await this.hash(password, this.passwordSaltRounds);
  }
}
