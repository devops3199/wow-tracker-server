import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { Auth } from '../domain/model';

@Service()
@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {}
