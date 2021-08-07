import Router from 'koa-router';
import passport from 'koa-passport';

const auth = new Router();

auth.get('/', passport.authenticate('bnet'));

auth.get('/callback', async (ctx) => {
    passport.authenticate('bnet', { session: false,  failureRedirect: '/' }, async (err, profile, info) => {
        console.log(profile, 'profile');
    })(ctx);

    ctx.redirect('/');
});

export default auth;