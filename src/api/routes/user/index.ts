import Router from 'koa-router';
import { UserService } from '../../services/user/application/service';
import { AuthService } from '../../services/auth/application/service';
import { User } from '../../services/user/domain/model';

const user = new Router();

user.get('/self', async (ctx) => {
  const { userId } = ctx.state as { userId: number };

  const service = new UserService();

  const { id, email, name } = await service.getUser(userId);

  ctx.body = { id, email, name };
});

user.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;

  const authService = new AuthService();

  ctx.body = await authService.login(email, password);
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

user.post('/email/check', async (ctx) => {
  const { email } = ctx.request.body;
  const service = new UserService();
  const result = await service.checkDuplicates(email);
  if (result) {
    ctx.status = 409; // NOTE: Conflict
    return;
  }
  ctx.status = 204;
});

export default user;
