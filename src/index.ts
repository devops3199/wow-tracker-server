import 'reflect-metadata';
import Koa from 'koa';
import cors from '@koa/cors';
import session from 'koa-session';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import { typediMiddleware } from './middleware';
import api from './api/routes/index';
import { initialize, CLIENT_URL } from './shared/config';

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

router.get('/ping', (ctx) => {
  ctx.body = 'pong';
});

initialize(); // NOTE: create a db connection

app.keys = ['fastfive'];

app
  .use(session({ key: 'tracker', maxAge: 60 * 60 * 1000 }, app))
  .use(cors({ origin: CLIENT_URL, credentials: true }))
  .use(bodyParser())
  .use(typediMiddleware)
  .use(passport.initialize())
  .use(passport.session())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(4000, () => console.log('4000 Port Server Running'));
