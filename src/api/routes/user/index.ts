import Router from 'koa-router';
import { UserService } from '../../services/user/application/service';
import { AuthService } from '../../services/auth/application/service';
import { User } from '../../services/user/domain/model';
import { Auth } from '../../services/auth/domain/model';
import { v4 as uuidv4 } from 'uuid';

const user = new Router();

user.get('/:userId', async (ctx) => {
  const id = Number(ctx.params.userId);

  const service = new UserService();

  ctx.body = await service.getUser(id);
});

user.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;

  const userService = new UserService();
  const authService = new AuthService();

  const user = await userService.getEmail(email);

  if (!user) {
    throw ctx.throw(401, 'Unauthorized');
  }

  const isValid = user.verifyPassword(password);

  if (!isValid) {
    throw ctx.throw(401, 'Unauthorized');
  }

  const auth = new Auth({
    id: uuidv4(),
    createdAt: new Date(),
  });

  await authService.save(auth);

  ctx.body = auth.generateToken();
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
