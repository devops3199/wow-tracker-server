import { Context } from '../../shared/types';
import jwt from 'jsonwebtoken';

// TODO: 이것도 다른 미들웨어로 분리?
const exceptions = [];

export const authMiddleware = async (ctx: Context, next: () => Promise<any>) => {
  const { url } = ctx.request;

  if (url.startsWith('/api/auth')) {
    await next();
    return;
  }

  const { authorization: token } = ctx.request.header;

  if (!token) {
    throw ctx.throw(403, 'Invalid token');
  }

  const { bnetToken } = jwt.decode(token) as { bnetToken?: string };

  if (!bnetToken) {
    throw ctx.throw(403, 'Invalid token');
  }

  await next();
};
