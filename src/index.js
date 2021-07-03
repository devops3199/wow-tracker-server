import Koa from 'koa';
import Router from 'koa-router';
import api from './api/index.js';
import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => console.log('4000 Port Server Running'));