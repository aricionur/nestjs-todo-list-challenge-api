import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TodosResolver } from './todos.resolver';
import { TodosService } from './todos.service';
import { TodoModel } from './models/todo.model';

@Module({
  imports: [SequelizeModule.forFeature([TodoModel])],
  providers: [TodosService, TodosResolver],
})
export class TodosModule {}
