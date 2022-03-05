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

bnet.get('/realms', async (ctx, next) => {
  // @ts-ignore
  const user = ctx.req.user;

  if (user) {
    // FIXME: 더럽다
    const result = await Promise.all([
      http.get('/data/wow/connected-realm/205', {
        headers: { authorization: `Bearer ${user.token}`, 'Battlenet-Namespace': 'dynamic-kr', locale: 'ko_KR' },
      }),
      http.get('/data/wow/connected-realm/210', {
        headers: { authorization: `Bearer ${user.token}`, 'Battlenet-Namespace': 'dynamic-kr', locale: 'ko_KR' },
      }),
      http.get('/data/wow/connected-realm/214', {
        headers: { authorization: `Bearer ${user.token}`, 'Battlenet-Namespace': 'dynamic-kr', locale: 'ko_KR' },
      }),
      http.get('/data/wow/connected-realm/2116', {
        headers: { authorization: `Bearer ${user.token}`, 'Battlenet-Namespace': 'dynamic-kr', locale: 'ko_KR' },
      }),
    ]);

    ctx.status = 200;
    ctx.body = { data: result.map((promise) => promise.data) };
  } else {
    ctx.status = 403;
    ctx.body = 'Invalid session';
  }
});

export default bnet;
