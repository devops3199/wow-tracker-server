import { AuthRepository } from '../infrastructure/repository';
import { Auth } from '../domain/model';
import { getCustomRepository } from 'typeorm';

export class AuthService {
  retrieve(id: number) {
    const playRepository = getCustomRepository(AuthRepository);
    return playRepository.findOne(id);
  }

  save(model: Auth) {
    const playRepository = getCustomRepository(AuthRepository);
    playRepository.save([model]);
  }
}
