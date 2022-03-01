import passport from 'koa-passport';
import BnetStrategy from 'passport-bnet';
import { createConnection } from 'typeorm';
import { User } from '../api/services/user/domain/model';
import { UserService } from '../api/services/user/application/service';

const CLIENT_URL = 'http://localhost:3000';
const BNET_URL = 'https://kr.api.blizzard.com';

passport.use(
  new BnetStrategy(
    {
      clientID: process.env.WOW_BNET_ID!,
      clientSecret: process.env.WOW_BNET_SECRET!,
      callbackURL: '/api/auth/callback',
      region: 'kr',
      scope: 'wow.profile',
    },
    async (accessToken, refreshToken, profile, done) => {
      const service = new UserService();
      await service.register(new User({ id: profile.id, token: profile.token, battleTag: profile.battletag }));
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const service = new UserService();
  const user = await service.getUser(id);

  if (!user) {
    throw Error();
  }

  done(null, user);
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

export { dbConnection, initialize, CLIENT_URL, BNET_URL };
