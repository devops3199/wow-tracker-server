import { UserRepository } from '../infrastructure/repository';
import { User } from '../domain/model';
import jwt from 'jsonwebtoken';
import passwordHash from 'password-hash';
import { getCustomRepository } from 'typeorm';

export class UserService {
  async register(user: User) {
    const userRepository = getCustomRepository(UserRepository);
    user.password = passwordHash.generate(user.password);
    await userRepository.save(user);
  }

  async getUser(id: number) {
    const userRepository = getCustomRepository(UserRepository);
    const result = await userRepository.findById(id);
    return result;
  }

  async getEmail(email: string) {
    const userRepository = getCustomRepository(UserRepository);
    return await userRepository.findByEmail(email);
  }

  async login(email: string, password: string) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email); // TODO: get a user

    if (user) {
      const isValid = passwordHash.verify(password, user.password);

      if (isValid) {
        return jwt.sign(
          {
            email: user.email,
            name: user.name,
          },
          'wow',
        );
      }
    }

    return 'Invalid';
  }
}
