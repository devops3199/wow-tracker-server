import { EntityRepository, Repository } from 'typeorm';
import { Auth } from '../domain/model';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {}
