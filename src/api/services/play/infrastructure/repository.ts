import { EntityRepository, Repository } from 'typeorm';
import { Play } from '../domain/model';

@EntityRepository(Play)
export class PlayRepository extends Repository<Play> {
  findByUserId(userId: number) {
    return this.findOne({ where: { userId } });
  }
}
