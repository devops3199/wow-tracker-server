import { Play } from '../domain/model';
import { Service } from '../../../../service';

export class PlayService extends Service {
  async getPlay(userId: number) {
    return await this.entityManager.findOneOrFail(Play, { where: { userId } });
  }
}
