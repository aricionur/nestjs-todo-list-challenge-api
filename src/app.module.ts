import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TodoModel } from './todos';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { UserModel } from './users/models/user.model';
import { AuthGuard } from './auth/auth.guard';

const AuthGuardProvider = { provide: APP_GUARD, useClass: AuthGuard };

@Module({
  imports: [
    UsersModule,
    TodosModule,
    CommonModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      // transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'testDB',
      models: [TodoModel, UserModel],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuardProvider],
})
export class AppModule {}
