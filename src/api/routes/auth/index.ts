import Router from 'koa-router';
import passport from 'koa-passport';

const auth = new Router();

auth.get('/', passport.authenticate('bnet'));

auth.get(
  '/callback',
  passport.authenticate('bnet', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/failure',
  }),
);

auth.get('/success', (ctx, next) => {
  // @ts-ignore
  const user = ctx.req.user;
  ctx.status = 200;
  ctx.body = { data: user };
});

auth.get('/failure', async (ctx, next) => {
  ctx.status = 401;
  ctx.body = 'Unauthorized';
});

auth.post('/logout', async (ctx, next) => {
  await ctx.logout();
  ctx.session = null;
  ctx.status = 200;
});

export default auth;
