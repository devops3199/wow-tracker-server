import passport from 'koa-passport';
import BnetStrategy from 'passport-bnet';
import dotenv from 'dotenv';
dotenv.config({ path: ".env" });

const oAuth = passport.use(new BnetStrategy({
    clientID: process.env.WOW_BNET_ID,
    clientSecret: process.env.WOW_BNET_SECRET,
    callbackURL: "https://localhost:4000/api/auth/callback",
    region: "kr"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

export default oAuth;