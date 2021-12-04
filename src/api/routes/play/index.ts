import Router from 'koa-router';
import { PlayService } from '../../services/play/application/service';

const play = new Router();

play.get('/:userId', async (ctx, next) => {
  // FIXME: through get user from auth middleware
  const id = Number(ctx.params.userId);
  const service = new PlayService();
  const plays = service.getPlay(id);
  ctx.body = plays;
});

export default play;
