import { EntityRepository, Repository } from 'typeorm';
import { User } from '../domain/model';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findById(id: number) {
    return this.findOneOrFail(id);
  }

  findByEmail(email: string) {
    return this.findOne({ email });
  }
}
