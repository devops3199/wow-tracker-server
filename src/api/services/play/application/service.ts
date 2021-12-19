import { PlayRepository } from '../infrastructure/repository';
import { getCustomRepository } from 'typeorm';

export class PlayService {
  getPlay(userId: number) {
    const playRepository = getCustomRepository(PlayRepository);
    return playRepository.findByUserId(userId);
  }
}
