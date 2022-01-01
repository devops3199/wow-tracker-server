import Router from 'koa-router';
import { PlayService } from '../../services/play/application/service';

const play = new Router();

play.get('/:userId', async (ctx) => {
  const { userId: id } = ctx.state as { userId: number };
  const service = new PlayService();
  const plays = service.getPlay(id);
  ctx.body = plays;
});

export default play;
