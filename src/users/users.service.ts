import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GraphQLError } from 'graphql';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { User } from 'src/graphql.schema';
import { UserModel } from './models/user.model';
import { UserDto } from './dto/createUserDto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel) private model: typeof UserModel) {}

  async registerUser(user: UserDto): Promise<User | GraphQLError> {
    const { username, email, password } = user;

    const oldUser = await this.model.findOne({ where: { email } });
    if (oldUser) {
      throw new GraphQLError(
        `A user is already registered with the email:${email}.`,
        {
          extensions: { code: 'USER_ALREADY_EXISTS' },
        },
      );
    }

    const encryptedPassword = await bcryptjs.hash(password, 10);

    const newUser = await this.model.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { userID: newUser.id, email: newUser.email },
      'THE_SECRET_KEY',
      { expiresIn: '2h' },
    );

    await newUser.update({ token });

    return newUser;
  }

  async loginUser(loginUser: UserDto): Promise<User | GraphQLError> {
    const { email, password } = loginUser;

    const user = await this.model.findOne({ where: { email } });

    if (user && (await bcryptjs.compare(password, user.password))) {
      user.token = jwt.sign(
        { userID: user.id, email: user.email },
        'THE_SECRET_KEY',
        { expiresIn: '2h' },
      );

      user.save();

      return user;
    } else {
      throw new GraphQLError(`Incorect password.`, {
        extensions: { code: 'INCORRECT_PASSWORD' },
      });
    }
  }
}
