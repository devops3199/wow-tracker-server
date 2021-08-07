import Router from 'koa-router';
import { UserRepository } from '../../services/user/infrastructure/repository.js';

const user = new Router();

user.get('/:userId', async (ctx, next) => {
    const id = Number(ctx.params.userId);
    const userRepository = new UserRepository();
    const result = userRepository.findById(id);
    console.log(result);
    ctx.body = result;
});

export default user;