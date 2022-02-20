import Router from 'koa-router';
import passport from 'koa-passport';
import { Container } from 'typedi';
import { BNET } from '../../../shared/config';

const auth = new Router();

auth.get('/', passport.authenticate('bnet'));

auth.get(
  '/callback',
  passport.authenticate('bnet', { session: false, failureRedirect: '/ping' }),
  async (ctx, next) => {
    const profile = Container.get(BNET);
    ctx.body = profile;
  },
);

export default auth;
