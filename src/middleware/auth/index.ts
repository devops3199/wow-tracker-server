import { Context } from 'koa';

export const authMiddleware = async (ctx: Context, next: () => Promise<any>) => {
  console.log(ctx.state);
  await next();
};
