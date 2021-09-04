import { UserRepository } from '../infrastructure/repository.js';
import { User } from '../domain/model.js';

export class UserService {
    async register(user) {
        const repository = new UserRepository();

        const user = new User({
            email: user.email,
            name: user.name,
            password: user.password
        });

        await repository.save([user]);
    }
}