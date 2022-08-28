import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { Gender } from '~modules/users/gender.enum';

@Table({ tableName: 'users' })
export class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  @PrimaryKey
  @Column(DataType.STRING)
  login!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  userName!: CreationOptional<string>;

  @Column(DataType.ENUM(...Object.values(Gender)))
  gender!: CreationOptional<Gender>;

  @Column(DataType.BOOLEAN)
  admin!: CreationOptional<boolean>;

  @Column(DataType.DATE)
  createdAt!: CreationOptional<Date>;

  @Column(DataType.DATE)
  updatedAt!: CreationOptional<Date>;
}
