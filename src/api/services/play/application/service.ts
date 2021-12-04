import { PlayRepository } from '../infrastructure/repository';
import { Play } from '../domain/model';
import { getCustomRepository } from 'typeorm';

export class PlayService {
  async getPlay(userId: number) {
    const playRepository = getCustomRepository(PlayRepository);
    return await playRepository.findByUserId(userId);
  }
}
