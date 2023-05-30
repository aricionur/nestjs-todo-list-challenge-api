import { Column, Model, Table } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'todos' })
export class TodoModel extends Model<
  InferAttributes<TodoModel>,
  InferCreationAttributes<TodoModel>
> {
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  title: string;

  @Column
  isCompleted: boolean;

  @Column
  updatedAt: Date;

  @Column
  createdAt: Date;

  @Column
  userID: number;

  //   @Column({ type: DataType.FLOAT })
  //   testFloatField: number;
}
