import { UserRepository } from '../infrastructure/repository.js';
import { User } from '../domain/model.js';

export class UserService {
    async register(user) {
        const repository = new UserRepository();

        const model = new User({
            email: user.email,
            name: user.name,
            password: user.password
        });

        await repository.save([model]);
    }

    async getUser(id) {
        const repository = new UserRepository();
        return await repository.findById(id);
    }

    async getEmail(email) {
        const repository = new UserRepository();
        return await repository.findByEmail(email);
    }
}