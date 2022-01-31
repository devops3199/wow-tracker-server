import { AuthRepository } from '../infrastructure/repository';
import { UserRepository } from '../../user/infrastructure/repository';
import { Auth } from '../domain/model';
import { v4 as uuidv4 } from 'uuid';
import { getCustomRepository } from 'typeorm';

export class AuthService {
  retrieve(id: string) {
    const authRepository = getCustomRepository(AuthRepository);
    console.log(authRepository.getId, 'auth - retrieve');
    return authRepository.findOne(id);
  }

  // TODO: Transaction
  async login(email: string, password: string) {
    const userRepository = getCustomRepository(UserRepository);
    const authRepository = getCustomRepository(AuthRepository);
    console.log(userRepository.getId, 'user - login');
    console.log(authRepository.getId, 'auth - login');

    const user = await userRepository.findByConditions({ email });

    const isValid = user.verifyPassword(password);

    if (!isValid) {
      // throw ctx.throw(401, 'Unauthorized');
      throw Error();
    }

    const auth = new Auth({
      id: uuidv4(),
      userId: user.id,
      createdAt: new Date(),
    });

    await authRepository.save(auth);

    return auth.generateToken();
  }

  save(model: Auth) {
    const authRepository = getCustomRepository(AuthRepository);
    authRepository.save([model]);
  }
}
