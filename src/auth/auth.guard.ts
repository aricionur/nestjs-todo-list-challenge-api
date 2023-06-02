import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';

import { jwtConstants } from './constants';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    // Below context works for RESTful endpoint requests. Be carefull
    // const request = context.switchToHttp().getRequest();
    // const token = this.extractTokenFromHeader(request);
    // if (!token) {
    //   throw new UnauthorizedException();
    // }
    // try {
    //   const payload = await this.jwtService.verifyAsync(token, {
    //     secret: jwtConstants.secret,
    //   });
    //   // 💡 We're assigning the payload to the request object here
    //   // so that we can access it in our route handlers
    //   request['user'] = payload;
    // } catch {
    //   throw new UnauthorizedException();
    // }
    // return true;

    // Below context works for GraphQL endpoint requests. Be carefull

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const authHeader = request.headers?.authorization;
    if (authHeader) {
      const rawToken = authHeader.split('Bearer')[1];
      const token = rawToken && rawToken.trim();
      if (token) {
        try {
          const user = jwt.verify(token, jwtConstants.secret);
          request['user'] = user;

          return true;
        } catch (error) {
          throw new Error('Invalid/Expired token');
        }
      }

      throw new Error("Authentication token be 'Bearer [token]'");
    } else throw new Error('Authorization header must be provided.');
  }

  //   private extractTokenFromHeader(request: Request): string | undefined {
  //     const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //     return type === 'Bearer' ? token : undefined;
  //   }
}
