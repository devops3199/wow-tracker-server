import { Context } from 'koa';
import { AuthService } from '../../api/services/auth/application/service';
import jwt from 'jsonwebtoken';

// TODO: 이것도 다른 미들웨어로 분리?
const exceptions = ['/api/user/register', '/api/user/login', '/api/user/email/check', '/ping'];

export const authMiddleware = async (ctx: Context, next: () => Promise<any>) => {
  const { url } = ctx.request;

  if (exceptions.includes(url)) {
    await next();
    return;
  }

  const { authorization: token } = ctx.request.header;

  if (!token) {
    throw ctx.throw(403, 'Invalid token');
  }

  const { id } = jwt.decode(token) as { id: string | undefined };

  if (!id) {
    throw ctx.throw(403, 'Invalid token');
  }

  const service = new AuthService();
  const auth = await service.retrieve(id);

  if (!auth) {
    throw ctx.throw(401, 'Invalid token');
  }

  await next();
};
