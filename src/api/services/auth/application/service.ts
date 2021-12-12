import { AuthRepository } from '../infrastructure/repository';
import { Auth } from '../domain/model';
import { getCustomRepository } from 'typeorm';

export class AuthService {
  retrieve(id: string) {
    const authRepository = getCustomRepository(AuthRepository);
    return authRepository.findOne(id);
  }

  save(model: Auth) {
    const authRepository = getCustomRepository(AuthRepository);
    authRepository.save([model]);
  }
}
