import mysql from 'mysql';
import { dbConnection } from '../../../../shared/config';
import { User } from '../../user/domain/model';

export class AuthRepository {
    // NOTE: This logic should be refactored.
    async getToken(user: User) {
        const connection = mysql.createConnection(dbConnection);
        
        const token = (user: User): Promise<string[]> => {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT 1 FROM user WHERE email = ${user.email} AND password = ${user.password}`, (error, results, fields) => {
                    if (error) {
                        reject(new Error('Request Query Error - Token'));
                    }
                    resolve(results);
                });
            })
        }

        const result = await token(user);

        connection.end();

        return result[0];
    }
}