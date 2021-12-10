import Router from 'koa-router';
import play from './play';
import auth from './auth';
import user from './user';

const api = new Router();

api.use('/user', user.routes());
api.use('/play', play.routes());
api.use('/auth', auth.routes());

export default api;
