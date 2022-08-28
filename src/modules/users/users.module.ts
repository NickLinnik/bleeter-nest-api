import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {UsersRepository} from "~modules/users/users.repository";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "~modules/users/users.model";

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
