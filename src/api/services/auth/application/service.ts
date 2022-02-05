import { User } from '../../user/domain/model';
import { Auth } from '../domain/model';
import { Service } from '../../../../service';
import { v4 as uuidv4 } from 'uuid';

export class AuthService extends Service {
  retrieve(id: string) {
    return this.entityManager.findOne(Auth, id);
  }

  async login(email: string, password: string) {
    const user = await this.entityManager.findOneOrFail(User, { where: { email } });

    const isValid = user.verifyPassword(password);

    if (!isValid) {
      // throw ctx.throw(401, 'Unauthorized');
      throw Error();
    }

    const auth = new Auth({
      id: uuidv4(),
      userId: user.id,
      createdAt: new Date(),
    });

    await this.entityManager.save(Auth, [auth]);

    return auth.generateToken();
  }

  async save(model: Auth) {
    this.entityManager.save(Auth, [model]);
  }
}
