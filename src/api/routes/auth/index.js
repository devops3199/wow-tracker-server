import Router from 'koa-router';
import passport from 'koa-passport';

const records = new Router();

records.get('/', passport.authenticate('bnet'));

records.get('/callback', async (ctx) => {
    passport.authenticate('bnet', { session: false,  failureRedirect: '/' }, async (err, profile, info) => {
        console.log(profile, 'profile');
    })(ctx);

    ctx.redirect('/');
});

export default records;