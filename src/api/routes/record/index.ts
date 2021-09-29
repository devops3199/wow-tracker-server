import Router from 'koa-router';

const record = new Router();

record.get('/', async (ctx, next) => {
    ctx.body = 'records api';
});

export default record;