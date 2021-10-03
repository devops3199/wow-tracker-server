import Router from 'koa-router';
import passport from 'koa-passport';
import { AuthRepository } from '../../services/auth/infrastructure/repository';

const auth = new Router();

auth.get('/', passport.authenticate('bnet'));

auth.get('/callback', async (ctx, next) => {
    passport.authenticate('bnet', { session: false,  failureRedirect: '/' }, async (err, profile, info) => {
        console.log(profile, 'profile');
    })(ctx, next);

    ctx.redirect('/');
});

auth.post('/email', async (ctx) => {
    const email = ctx.request.body.email;
    const repository = new AuthRepository();
    ctx.body = await repository.findByEmail(email);
});

export default auth;