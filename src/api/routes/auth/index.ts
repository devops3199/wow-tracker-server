import Router from 'koa-router';
import passport from 'koa-passport';
import { User } from '../../services/user/domain/model';
import { UserService } from '../../services/user/application/service';

const auth = new Router();

auth.get('/', passport.authenticate('bnet'));

auth.get(
  '/callback',
  passport.authenticate('bnet', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/failure',
  }),
);

auth.get('/success', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = 'Hello';
});

auth.get('/failure', async (ctx, next) => {});

export default auth;
