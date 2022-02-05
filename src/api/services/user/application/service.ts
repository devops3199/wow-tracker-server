import { Service } from '../../../../service';
import { User } from '../domain/model';

export class UserService extends Service {
  async register(user: User) {
    this.entityManager.save(User, [user]);
  }

  async getUser(id: number) {
    return this.entityManager.findOneOrFail(User, id);
  }

  async checkDuplicates(email: string) {
    return await this.entityManager.findOne(User, { where: { email } });
  }
}
