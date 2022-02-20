import passport from 'koa-passport';
import BnetStrategy from 'passport-bnet';
import { createConnection } from 'typeorm';
import { Container, Token } from 'typedi';

const BNET = new Token<{ id: number; battletag: string; token: string }>('BNET');

const oAuth = passport.use(
  new BnetStrategy(
    {
      clientID: process.env.WOW_BNET_ID ?? '',
      clientSecret: process.env.WOW_BNET_SECRET ?? '',
      callbackURL: 'http://localhost:4000/api/auth',
      region: 'kr',
    },
    (accessToken, refreshToken, profile, done) => {
      Container.set(BNET, profile);
      return done(null, profile);
    },
  ),
);

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

export { BNET, oAuth, dbConnection, initialize };
