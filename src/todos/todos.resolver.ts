import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { TodosService } from './todos.service';
import { Todo } from 'src/graphql.schema';
import { TodoDto } from './dto/createTodoDto';
import { TodoModel } from './models/todo.model';
import { Success } from 'src/graphql.schema';
import { User } from 'src/users/decorators/user .decorator';
import { AuthUserDto } from '../users/dto/authUserDto';

@Resolver('Todos')
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query('listTodos')
  getTodos(@Args() args: object, @User() user: AuthUserDto) {
    return this.todosService.listTodos(args, user);
  }

  @Mutation('createTodo')
  createTodo(
    @Args('input') args: TodoDto,
    @User() user: AuthUserDto,
  ): Todo | Promise<Todo> {
    return this.todosService.saveTodo(args, user);
  }

  @Mutation('markTodoCompleted')
  markTodoCompleted(@Args() args: TodoModel): Todo | Promise<Todo> {
    return this.todosService.markTodoCompleted(args);
  }

  @Mutation('markTodoUncompleted')
  markTodoUncompleted(@Args() args: TodoModel): Todo | Promise<Todo> {
    return this.todosService.markTodoUncompleted(args);
  }

  @Mutation('deleteTodo')
  deleteTodo(@Args() args: TodoModel): Promise<Success | GraphQLError> {
    return this.todosService.deleteTodo(args);
  }
}
