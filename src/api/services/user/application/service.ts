import { UserRepository } from '../infrastructure/repository';
import { AuthRepository } from '../../auth/infrastructure/repository';
import { User } from '../domain/model';
import jwt from 'jsonwebtoken';
import passwordHash from 'password-hash';

export class UserService {
  async register(user: User) {
    const repository = new UserRepository();
    user.password = passwordHash.generate(user.password); // TODO: Model 변경
    await repository.save([user]);
  }

  async getUser(id: number) {
    const repository = new UserRepository();
    return await repository.findById(id);
  }

  async getEmail(email: string) {
    const repository = new UserRepository();
    return await repository.findByEmail(email);
  }

  async login(user: User) {
    const repository = new AuthRepository();
    const { password } = await repository.getToken(user);

    const isValid = passwordHash.verify(user.password, password);

    // Generate Tokens
    if (isValid) {
      return jwt.sign(
        {
          email: user.email,
          name: user.name,
        },
        'wow',
      );
    }

    return '';
  }
}
