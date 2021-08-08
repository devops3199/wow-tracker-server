import mysql from 'mysql';

const dbConnection = {
    host: process.env.WOW_DB_HOST,
    port: Number(process.env.WOW_DB_PORT),
    user: process.env.WOW_DB_USER,
    password: process.env.WOW_DB_PASSWORD,
    database: process.env.WOW_DB_DATABASE
};

export class UserRepository {
    async findById(id) {
        const connection = mysql.createConnection(dbConnection);
        
        const getUser = (useId) => {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT email, name, password, joinDate FROM user WHERE id = ${useId}`, (error, results, fields) => {
                    if (error) {
                        reject(new Error('Request Query Error - get a user'));
                    }
                    resolve(results);
                });
            })
        }

        const result = await getUser(id);

        connection.end();

        return result;
    }
}