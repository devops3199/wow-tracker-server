import { Context } from '../../shared/types';
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

  const { id, userId } = jwt.decode(token) as { id: string | undefined; userId: number | undefined };

  if (!id) {
    throw ctx.throw(403, 'Invalid token');
  }

  const authService = new AuthService();
  const auth = await authService.retrieve(id);

  if (!auth) {
    throw ctx.throw(401, 'An unauthorized user');
  }

  ctx.state.userId = userId;

  await next();
};
