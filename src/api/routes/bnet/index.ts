import Router from 'koa-router';
import { http } from '../../../libs';

type Name = {
  en_US: string;
  ko_KR: string;
};

type Characters = {
  wow_accounts: {
    characters: {
      id: number;
      name: string;
      realm: {
        name: Name;
        slug: string;
      };
      playable_class: {
        name: Name;
      };
      playable_race: {
        name: Name;
      };
      gender: {
        name: Name;
      };
      faction: {
        name: Name;
      };
      level: number;
    }[];
  }[];
};

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

  const result = await http.get<Characters>('/profile/user/wow');

  ctx.status = 200;
  ctx.body = { data: result.wow_accounts };
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
