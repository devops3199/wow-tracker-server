import { UserRepository } from '../infrastructure/repository';
import { AuthRepository } from '../../auth/infrastructure/repository';
import { User } from '../domain/model';
import jwt from 'jsonwebtoken';
import passwordHash from 'password-hash';
import { getCustomRepository } from 'typeorm';

export class UserService {
  async register(user: User) {
    const repository = new UserRepository();
    user.password = passwordHash.generate(user.password);
    await repository.save([user]);
  }

  async getUser(id: number) {
    const userRepository = getCustomRepository(UserRepository);
    const result = await userRepository.findById(id);
    console.log(result);
    return result;
  }

  async getEmail(email: string) {
    const repository = new UserRepository();
    return await repository.findByEmail(email);
  }

  async login(user: User) {
    const repository = new AuthRepository();
    const { password } = await repository.getToken(user); // TODO: get a user

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
