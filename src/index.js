import Koa from 'koa';

const app = new Koa();

app.use(async ctx => ctx.body = "Server for wow tracker");

app.listen(4000, () => console.log('4000 Port Server Running'));