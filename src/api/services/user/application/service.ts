import { Service } from '../../../../service';
import { User } from '../domain/model';

export class UserService extends Service {
  async register(user: User) {
    this.entityManager.save(User, [user]);
  }

  async getUser(id: number, token: string) {
    return this.entityManager.findOne(User, { where: { id, token } });
  }
}
