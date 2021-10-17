import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import api from './api/routes/index';
import { initialize } from './shared/config';

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

router.get('/ping', (ctx) => {
  ctx.body = 'pong';
});

initialize(); // NOTE: create a db connection

app.use(bodyParser()).use(passport.initialize()).use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => console.log('4000 Port Server Running'));
