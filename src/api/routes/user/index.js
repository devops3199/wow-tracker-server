import Router from 'koa-router';
import { UserService } from '../../services/user/application/service.js';
import { User } from '../../services/user/domain/model.js';
import passwordHash from 'password-hash';
 
const user = new Router();

user.get('/:userId', async (ctx, next) => {
    const id = Number(ctx.params.userId);
    
    const service = new UserService();

    ctx.body = await service.getUser(id);
});

user.post('/', async (ctx, next) => {
    const password = passwordHash.generate(ctx.request.body.password);

    const user = new User({
        email: ctx.request.body.email,
        name: ctx.request.body.name,
        password: password,
    });
    
    const service = new UserService();

    await service.register(user);
});

export default user;