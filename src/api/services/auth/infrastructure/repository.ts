import mysql from 'mysql';
import { dbConnection } from '../../../../shared/config';
import { User } from '../../user/domain/model';

export class AuthRepository {
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
            })
        }

        const result = await getUser(email);

        connection.end();

        return result.length > 0 ? result[0] : ['No Result'];
    }

    // NOTE: This logic should be refactored.
    async getToken(user: User) {
        const connection = mysql.createConnection(dbConnection);
        
        const token = (user: User): Promise<string[]> => {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT 1 FROM user WHERE email = ${user.email} AND password = ${user.password}`, (error, results, fields) => {
                    if (error) {
                        reject(new Error('Request Query Error - login'));
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