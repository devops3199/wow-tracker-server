import Router from 'koa-router';
import { UserService } from '../../services/user/application/service';
import { User } from '../../services/user/domain/model';
import passwordHash from 'password-hash';
 
const user = new Router();

user.get('/:userId', async (ctx) => {
    const id = Number(ctx.params.userId);
    
    const service = new UserService();

    ctx.body = await service.getUser(id);
});

user.post('/', async (ctx) => {
    const password = passwordHash.generate(ctx.request.body.password);

    const user = new User({
        email: ctx.request.body.email,
        name: ctx.request.body.name,
        password: password,
    });
    
    const service = new UserService();

    await service.register(user);
});

user.post('/login', async (ctx) => {
    const password = passwordHash.generate(ctx.request.body.password);

    const user = new User({
        email: ctx.request.body.email,
        name: '',
        password: password,
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