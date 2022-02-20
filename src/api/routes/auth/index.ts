import Router from 'koa-router';
import passport from 'koa-passport';
import { Container } from 'typedi';
import { BNET } from '../../../shared/config';
import { User } from '../../services/user/domain/model';
import { UserService } from '../../services/user/application/service';

const auth = new Router();

auth.get('/', passport.authenticate('bnet', { session: false, failureRedirect: '/ping' }), async (ctx, next) => {
  const { id, token, battletag: battleTag } = Container.get(BNET);

  const service = new UserService();
  const user = await service.getUser(id, token);
  if (!user) {
    await service.register(new User({ id, token, battleTag }));
  }

  ctx.status = 200;
  ctx.body = { data: { bnet: token, battleTag } };
});

export default auth;
