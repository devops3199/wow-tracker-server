import passport from 'koa-passport';
import BnetStrategy from 'passport-bnet';

const oAuth = passport.use(new BnetStrategy({
    clientID: process.env.WOW_BNET_ID,
    clientSecret: process.env.WOW_BNET_SECRET,
    callbackURL: "https://localhost:4000/api/auth/callback",
    region: "kr"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

const dbConnection = {
    host: process.env.WOW_DB_HOST,
    port: Number(process.env.WOW_DB_PORT),
    user: process.env.WOW_DB_USER,
    password: process.env.WOW_DB_PASSWORD,
    database: process.env.WOW_DB_DATABASE
};

export { oAuth, dbConnection };