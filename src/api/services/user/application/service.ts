import { UserRepository } from '../infrastructure/repository';
import { AuthRepository } from '../../auth/infrastructure/repository';
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
    const repository = new AuthRepository();
    const user = new User({
      email,
      password,
      name: '',
      createdAt: new Date(),
    });
    const { password: hash } = await repository.getToken(user); // TODO: get a user

    const isValid = passwordHash.verify(user.password, hash);

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

    return 'Invalid';
  }
}
