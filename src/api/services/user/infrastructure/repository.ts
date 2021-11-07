import mysql from 'mysql';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../domain/model';
import { dbConnection } from '../../../../shared/config';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findById(id: number) {
    return this.findById(id);
  }

  findByEmail(email: string) {
    return this.findOne({ email });
  }
}
