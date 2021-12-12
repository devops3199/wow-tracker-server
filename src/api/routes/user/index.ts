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
  const { email, password } = ctx.request.body;

  const service = new UserService();

  const token = await service.login(email, password);

  if (token === 'Invalid') {
    throw ctx.throw(401, 'Unauthorized');
  }

  ctx.body = token;
});

user.post('/register', async (ctx) => {
  const { email, name, password, createdAt } = ctx.request.body;

  const user = new User({
    email,
    name,
    password,
    createdAt,
  });

  const service = new UserService();

  await service.register(user);

  ctx.status = 201;
});

// FIXME: refactor
user.post('/email/check', async (ctx) => {
  const { email } = ctx.request.body;
  const service = new UserService();
  const result = await service.getEmail(email);
  ctx.body = result ? 'Ok' : 'Duplicate';
});

export default user;
