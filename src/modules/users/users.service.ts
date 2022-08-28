import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '~modules/users/dto/create-user.dto';
import { UsersRepository } from '~modules/users/users.repository';
import { UserModel } from '~modules/users/users.model';
import { promisify } from 'util';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from '~modules/users/dto/update-user.dto';
import { UserByLoginNotFoundError } from '~modules/users/users.errors/users.app-erros';

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

  async findOne(login: string): Promise<UserModel | null> {
    // TODO exclude password
    return await this.usersRepository.findOne(login);
  }

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const { password, ...otherValues } = createUserDto;
    console.log(password)
    console.log(createUserDto)
    return await this.usersRepository.create({
      ...otherValues,
      password: await this.hashPassword(password),
    });
  }

  async update(
    login: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    const user = await this.findOne(login);
    if (!user) throw new UserByLoginNotFoundError();

    const newUpdateUserDto = Object.assign({}, updateUserDto);
    if (newUpdateUserDto.password) {
      newUpdateUserDto.password = await this.hashPassword(
        newUpdateUserDto.password,
      );
    }

    return await this.usersRepository.update(user, newUpdateUserDto);
  }

  private async hashPassword(password: string): Promise<string> {
    return await this.hash(password, this.passwordSaltRounds);
  }
}
