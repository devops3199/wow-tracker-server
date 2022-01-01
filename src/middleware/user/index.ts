import { Context } from '../../shared/types';
import { UserService } from '../../api/services/user/application/service';

// TODO: 이것도 다른 미들웨어로 분리?
const exceptions = ['/user/self'];

export const userMiddleware = async (ctx: Context, next: () => Promise<any>) => {
  const { url } = ctx.request;

  if (!exceptions.includes(url)) {
    await next();
    return;
  }

  const userService = new UserService();
  ctx.state.user = await userService.getUser(ctx.state.userId!);

  await next();
};
