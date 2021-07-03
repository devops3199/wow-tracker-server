import Router from 'koa-router';
import oAuth from '../../shared/config.js';

const records = new Router();

records.get('/', async (ctx, next) => {
    oAuth.authenticate('bnet');
    ctx.body = 'auth api';
});

records.get('/callback', async (ctx, next) => {
    oAuth.authenticate('bnet', { failureRedirect: '/api/records' });
    ctx.redirect('/');
});

export default records;