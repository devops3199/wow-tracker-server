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
  const user = new User({
    email: ctx.request.body.email,
    name: '',
    password: ctx.request.body.password,
  });

  const service = new UserService();

  ctx.body = await service.login(user);
});

user.post('/register', async (ctx) => {
  const user = new User({
    email: ctx.request.body.email,
    name: ctx.request.body.name,
    password: ctx.request.body.password,
  });

  const service = new UserService();

  await service.register(user);

  ctx.body = '';
});

export default user;
