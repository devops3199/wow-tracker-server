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
    // FIXME: throw 403
    throw ctx.throw(403, 'Invalid token');
  }
  // @ts-ignore
  const { id } = jwt.decode(token);

  const service = new AuthService();
  const auth = await service.retrieve(id);

  if (!auth) {
    throw ctx.throw(401, 'Invalid token');
  }

  await next();
};
