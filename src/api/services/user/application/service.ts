import { UserRepository } from '../infrastructure/repository';
import { AuthRepository } from '../../auth/infrastructure/repository';
import { User } from '../domain/model';
import jwt from 'jsonwebtoken';

export class UserService {
    async register(user: User) {
        const repository = new UserRepository();
        await repository.save([user]);
    }

    async getUser(id: number) {
        const repository = new UserRepository();
        return await repository.findById(id);
    }

    async getEmail(email: string) {
        const repository = new AuthRepository();
        return await repository.findByEmail(email);
    }

    async login(user: User) {
        const repository = new AuthRepository();
        const result = await repository.getToken(user);

        // Generate Tokens
        if (result === '1') {
            return jwt.sign({
                email: user.email,
                name: user.name
            }, 'trackertower');
        }

        return '';
    }
}