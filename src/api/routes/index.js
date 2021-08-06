import Router from 'koa-router';
import record from './record/index.js';
import auth from './auth/index.js';

const api = new Router();

api.use('/record', record.routes());
api.use('/auth', auth.routes());

export default api;