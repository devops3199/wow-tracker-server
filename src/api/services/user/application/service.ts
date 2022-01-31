import { UserRepository } from '../infrastructure/repository';
import { User } from '../domain/model';
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
    return userRepository.findByConditions({ email });
  }
}
