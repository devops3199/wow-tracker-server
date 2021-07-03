import Router from 'koa-router';
import records from './records/index.js';
import auth from './auth/index.js';

const api = new Router();

api.use('/records', records.routes());
api.use('/auth', auth.routes());

export default api;