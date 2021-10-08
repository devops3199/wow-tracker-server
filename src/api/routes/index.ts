import Router from 'koa-router';
import record from './record/index';
import auth from './auth/index';
import user from './user/index';

const api = new Router();

api.use('/user', user.routes());
api.use('/record', record.routes());
api.use('/auth', auth.routes());

export default api;
