import mysql from 'mysql';
import { User } from '../domain/model';
import { dbConnection } from '../../../../shared/config';

export class UserRepository {
  async findById(id: number) {
    const connection = mysql.createConnection(dbConnection);

    const getUser = (userId: number): Promise<string[]> => {
      return new Promise((resolve, reject) => {
        connection.query(
          `SELECT email, name, password, createdAt FROM user WHERE id = ${userId}`,
          (error, results: string[], fields) => {
            if (error) {
              reject(new Error('Request Query Error - get a user'));
            }
            resolve(results);
          },
        );
      });
    };

    const result = await getUser(id);

    connection.end();

    return result.length > 0 ? result[0] : ['No Result'];
  }

  async findByEmail(email: string) {
    const connection = mysql.createConnection(dbConnection);

    const getUser = (email: string): Promise<string[]> => {
      return new Promise((resolve, reject) => {
        connection.query(`SELECT password FROM user WHERE email = ${email}`, (error, results, fields) => {
          if (error) {
            reject(new Error('Request Query Error - get a user'));
          }
          resolve(results);
        });
      });
    };

    const result = await getUser(email);

    connection.end();

    return result.length > 0 ? result[0] : ['No Result'];
  }

  async save(user: User[]) {
    const connection = mysql.createConnection(dbConnection);

    const saveUser = (user: User): Promise<void> => {
      return new Promise((resolve, reject) => {
        connection.query(
          `INSERT INTO user (email, name, password, createdAt) VALUES ('${user.email}', '${user.name}', '${user.password}', now())`,
          (error, results, fields) => {
            if (error) {
              reject(new Error('Request Query Error - save a user'));
            }
            resolve();
          },
        );
      });
    };

    await saveUser(user[0]);

    connection.end();
  }
}
