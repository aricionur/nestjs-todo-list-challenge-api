import { Column, Table, Model } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'users' })
export class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  token: string;
}
