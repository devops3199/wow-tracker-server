import { Service } from '../../../../service';
import { User } from '../domain/model';

export class UserService extends Service {
  async register(user: User) {
    // TODO: updatedAt을 어떻게 할까...
    this.entityManager.upsert(
      User,
      [{ id: user.id, token: user.token, battleTag: user.battleTag, updatedAt: new Date() }],
      {
        conflictPaths: ['id'],
      },
    );
  }

  async getUser(id: number) {
    return this.entityManager.findOne(User, { id });
  }
}
