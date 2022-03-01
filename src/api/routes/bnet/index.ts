import Router from 'koa-router';
import { http } from '../../../libs';

const bnet = new Router();

bnet.get('/profile', async (ctx, next) => {
  // @ts-ignore
  const user = ctx.req.user;
  if (user) {
    const result = await http.get('/profile/user/wow', {
      headers: { authorization: `Bearer ${user.token}`, 'Battlenet-Namespace': 'profile-kr', locale: 'ko_KR' },
    });
    ctx.status = 200;
    ctx.body = { data: result.data };
  } else {
    ctx.status = 403;
    ctx.body = 'Invalid session';
  }
});

export default bnet;
