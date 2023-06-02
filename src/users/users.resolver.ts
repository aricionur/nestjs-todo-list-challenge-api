import { Mutation, Args, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { UsersService } from './users.service';
import { UserDto } from './dto/createUserDto';
import { User } from 'src/graphql.schema';
import { Public } from 'src/auth/decorators/public.decorator';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Mutation('registerUser')
  registerUser(@Args('input') user: UserDto): Promise<User | GraphQLError> {
    return this.usersService.registerUser(user);
  }

  @Public()
  @Mutation('loginUser')
  loginUser(@Args('input') user: UserDto): Promise<User | GraphQLError> {
    return this.usersService.loginUser(user);
  }
}
