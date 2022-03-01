import Router from 'koa-router';
import auth from './auth';
import bnet from './bnet';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/bnet', bnet.routes());

export default api;
