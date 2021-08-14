import Router from 'koa-router';
import { UserRepository } from '../../services/user/infrastructure/repository.js';
import { User } from '../../services/user/domain/model.js';
import passwordHash from 'password-hash';
 
const user = new Router();

user.get('/:userId', async (ctx, next) => {
    const id = Number(ctx.params.userId);
    const userRepository = new UserRepository();
    const result = await userRepository.findById(id);
    ctx.body = result;
});

user.post('/', async (ctx, next) => {
    const password = passwordHash.generate(ctx.request.body.password);
    const user = new User({
        email: ctx.request.body.email,
        name: ctx.request.body.name,
        password: password,
    });
    console.log(user)
});

export default user;