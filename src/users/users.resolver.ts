import { Mutation, Args, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { UsersService } from './users.service';
import { UserDto } from './dto/createUserDto';
import { User } from 'src/graphql.schema';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('registerUser')
  registerUser(@Args('input') user: UserDto): Promise<User | GraphQLError> {
    return this.usersService.registerUser(user);
  }

  @Mutation('loginUser')
  loginUser(@Args('input') user: UserDto): Promise<User | GraphQLError> {
    return this.usersService.loginUser(user);
  }
}
