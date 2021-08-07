import Koa from 'koa';
import Router from 'koa-router';
import passport from 'koa-passport';
import api from './api/routes/index.js';

import dotenv from 'dotenv';
dotenv.config({ path: ".env" });

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(passport.initialize()).use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => console.log('4000 Port Server Running'));