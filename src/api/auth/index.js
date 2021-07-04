import Router from 'koa-router';
import passport from 'koa-passport';

const records = new Router();

records.get('/', passport.authenticate('bnet'));

records.get('/callback', async (ctx, next) => {
    return passport.authenticate('bnet', { failureRedirect: '/api/records' }, async (err, profile, info) => {
        console.log(profile, 'profile');
        ctx.redirect('/');
    })(ctx);
});

export default records;