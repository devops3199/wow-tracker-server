import Router from 'koa-router';
import { UserService } from '../../services/user/application/service';
import { User } from '../../services/user/domain/model';

const user = new Router();

user.get('/:userId', async (ctx) => {
  const id = Number(ctx.params.userId);

  const service = new UserService();

  ctx.body = await service.getUser(id);
});

user.post('/login', async (ctx) => {
  const service = new UserService();

  ctx.body = await service.login(ctx.request.body.email, ctx.request.body.password);
});

user.post('/register', async (ctx) => {
  const user = new User({
    email: ctx.request.body.email,
    name: ctx.request.body.name,
    password: ctx.request.body.password,
    createdAt: ctx.request.body.createdAt,
  });

  const service = new UserService();

  await service.register(user);

  ctx.body = '';
});

user.post('/email/check', async (ctx) => {
  const service = new UserService();
  const result = await service.getEmail(ctx.request.body.email);
  ctx.body = result ? 'Valid' : 'Invalid';
});

export default user;
