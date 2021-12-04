import Router from 'koa-router';
import play from './play/index';
import auth from './auth/index';
import user from './user/index';

const api = new Router();

api.use('/user', user.routes());
api.use('/play', play.routes());
api.use('/auth', auth.routes());

export default api;
