import Router from 'koa-router';

const records = new Router();

records.get('/', async (ctx, next) => {
    ctx.body = 'records api';
});

export default records;