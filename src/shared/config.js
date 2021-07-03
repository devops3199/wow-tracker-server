import passport from 'passport';
import BnetStrategy from 'passport-bnet';

console.log(process.env.WOW_BNET_ID, 'id');
console.log(process.env.WOW_BNET_SECRET, 'secret');

const oAuth = passport.use(new BnetStrategy({
    clientID: process.env.WOW_BNET_ID,
    clientSecret: process.env.WOW_BNET_SECRET,
    callbackURL: "https://localhost:4000/api/auth/callback",
    region: "us"
}, function(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile, 'Success');
    return done(null, profile);
}));

export default oAuth;