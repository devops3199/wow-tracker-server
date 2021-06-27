import Router from 'koa-router';
import records from './records/index.js';

const api = new Router();

api.use('/records', records.routes());

export default api;