import { Context } from 'koa';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (ctx: Context, next: () => Promise<any>) => {
  const token = ctx.request.header.authorization;

  if (!token) {
    // FIXME: throw 403
    throw Error();
  }
  // @ts-ignore
  const { id } = jwt.decode(token);

  await next();
};
