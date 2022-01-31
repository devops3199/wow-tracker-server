import { EntityRepository, Repository } from 'typeorm';
import { User } from '../domain/model';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findById(id: number) {
    return this.findOneOrFail(id);
  }

  findByConditions(args: Record<string, any>) {
    return this.findOneOrFail({ where: args });
  }

  findByEmail(email: string) {
    return this.findOne({ email });
  }
}
