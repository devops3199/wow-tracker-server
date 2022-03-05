import Router from 'koa-router';
import { http } from '../../../libs';

const bnet = new Router();

bnet.get('/profile', async (ctx, next) => {
  // @ts-ignore
  const user = ctx.req.user;

  if (!user) {
    ctx.status = 403;
    ctx.body = 'Invalid session';
    return;
  }

  http.setAuthorization(`Bearer ${user.token}`);
  http.setBattlenetNamespace('profile-kr');

  const result = await http.get('/profile/user/wow');

  ctx.status = 200;
  ctx.body = { data: result };
});

bnet.get('/realms', async (ctx, next) => {
  // @ts-ignore
  const user = ctx.req.user;

  if (!user) {
    ctx.status = 403;
    ctx.body = 'Invalid session';
    return;
  }

  http.setAuthorization(`Bearer ${user.token}`);
  http.setBattlenetNamespace('dynamic-kr');

  const result = await Promise.all([
    http.get('/data/wow/connected-realm/205'),
    http.get('/data/wow/connected-realm/210'),
    http.get('/data/wow/connected-realm/214'),
    http.get('/data/wow/connected-realm/2116'),
  ]);

  ctx.status = 200;
  ctx.body = { data: result };
});

export default bnet;
