import { EntityRepository, Repository } from 'typeorm';
import { Play } from '../domain/model';

@EntityRepository(Play)
export class playRepository extends Repository<Play> {
  findById(id: number) {
    return this.findById(id);
  }
}
