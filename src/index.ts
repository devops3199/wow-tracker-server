import 'reflect-metadata';
import Koa from 'koa';
import cors from '@koa/cors';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import { authMiddleware, userMiddleware, typediMiddleware } from './middleware';
import api from './api/routes/index';
import { initialize } from './shared/config';

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

router.get('/ping', (ctx) => {
  ctx.body = 'pong';
});

initialize(); // NOTE: create a db connection

app
  .use(cors())
  .use(bodyParser())
  .use(typediMiddleware)
  .use(authMiddleware)
  .use(userMiddleware)
  .use(passport.initialize())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(4000, () => console.log('4000 Port Server Running'));
