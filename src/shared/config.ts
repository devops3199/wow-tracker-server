import passport from 'koa-passport';
import BnetStrategy from 'passport-bnet';
import { createConnection } from 'typeorm';

passport.use(
  new BnetStrategy(
    {
      clientID: process.env.WOW_BNET_ID ?? '',
      clientSecret: process.env.WOW_BNET_SECRET ?? '',
      callbackURL: '/api/auth/callback',
      region: 'kr',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // TODO: findById
  // @ts-expect-error
  done(null, id);
});

const dbConnection = {
  host: process.env.WOW_DB_HOST,
  port: Number(process.env.WOW_DB_PORT),
  user: process.env.WOW_DB_USER,
  password: process.env.WOW_DB_PASSWORD,
  database: process.env.WOW_DB_DATABASE,
};

const initialize = async () => {
  try {
    await createConnection({
      type: 'mysql',
      host: process.env.WOW_DB_HOST,
      port: Number(process.env.WOW_DB_PORT),
      username: process.env.WOW_DB_USER,
      password: process.env.WOW_DB_PASSWORD,
      database: process.env.WOW_DB_DATABASE,
      entities: ['src/entity/*{.js,.ts}'],
    });
  } catch (e) {
    console.error('connection error >> ' + e);
  }
};

export { dbConnection, initialize };
