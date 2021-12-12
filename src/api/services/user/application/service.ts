import { UserRepository } from '../infrastructure/repository';
import { User } from '../domain/model';
import jwt from 'jsonwebtoken';
import passwordHash from 'password-hash';
import { getCustomRepository } from 'typeorm';

export class UserService {
  register(user: User) {
    const userRepository = getCustomRepository(UserRepository);
    userRepository.save(user);
  }

  getUser(id: number) {
    const userRepository = getCustomRepository(UserRepository);
    return userRepository.findById(id);
  }

  getEmail(email: string) {
    const userRepository = getCustomRepository(UserRepository);
    return userRepository.findByEmail(email);
  }

  async login(email: string, password: string) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email); // TODO: get a user

    if (user) {
      const isValid = passwordHash.verify(password, user.password);

      if (isValid) {
        // FIXME: to hash
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
