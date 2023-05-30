import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';

import { Todo } from '../graphql.schema';
import { TodoModel } from './models/todo.model';
import { TodoDto } from './dto/createTodoDto';
import { Success } from '../graphql.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(TodoModel) private model: typeof TodoModel) {}

  async saveTodo(args: TodoDto, user: any) {
    const { id } = args;
    const today = new Date();
    args.updatedAt = today;

    if (id) {
      const [updatedData] = await this.model.upsert(args);
      return updatedData;
    } else {
      const { userID } = user;

      if (userID) args.userID = userID;
      args.createdAt = today;

      return this.model.create(args);
    }
  }

  findAll(args): Promise<Todo[]> {
    return this.model.findAll({ where: args });
  }

  markTodoCompleted(args: TodoDto) {
    args.isCompleted = true;

    return this.saveTodo(args, {});
  }

  markTodoUncompleted(args: TodoDto) {
    args.isCompleted = false;

    return this.saveTodo(args, {});
  }

  async deleteTodo({ id }): Promise<Success | GraphQLError> {
    const deletedCount = await this.model.destroy({ where: { id } });

    if (deletedCount === 0)
      return new GraphQLError(`Given id:${id}  does not exist in database.`, {
        extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
      });

    return { isSuccess: true };
  }
}
