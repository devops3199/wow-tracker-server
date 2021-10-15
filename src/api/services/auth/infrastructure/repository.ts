import mysql from 'mysql';
import { dbConnection } from '../../../../shared/config';
import { User } from '../../user/domain/model';

export class AuthRepository {
  async getToken(user: User) {
    const connection = mysql.createConnection(dbConnection);

    const token = (user: User): Promise<{ password: string }[]> => {
      return new Promise((resolve, reject) => {
        connection.query(`SELECT password FROM user WHERE email = '${user.email}'`, (error, results, fields) => {
          if (error) {
            reject(new Error('Request Query Error - Token'));
          }
          resolve(results);
        });
      });
    };

    const result = await token(user);

    connection.end();

    return result[0];
  }
}
