import { UserRepository } from '../infrastructure/repository.js';
import { AuthReposiotry } from '../../auth/infrastructure/repository.js';

export class UserService {
    async register(user) {
        const repository = new UserRepository();
        await repository.save([user]);
    }

    async getUser(id) {
        const repository = new UserRepository();
        return await repository.findById(id);
    }

    async getEmail(email) {
        const repository = new AuthReposiotry();
        return await repository.findByEmail(email);
    }

    async login(user) {
        const repository = new AuthReposiotry();
        const result = await repository.getToken(user);

        // Generate Tokens

        return '';
    }
}