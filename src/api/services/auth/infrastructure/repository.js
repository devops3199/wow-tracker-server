import mysql from 'mysql';
import { dbConnection } from '../../../../shared/config.js';

export class AuthRepository {
    async findByEmail(email) {
        const connection = mysql.createConnection(dbConnection);
        
        const getUser = (email) => {
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
}