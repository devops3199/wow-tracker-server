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
        
        const getUser = () => {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT email, name, password, joinDate FROM user WHERE id = ${id}`, (error, results, fields) => {
                    if (error) {
                        reject(new Error('Request Query Error - get a user'));
                    }
                    resolve(results);
                });
            })
        }

        connection.end();

        return undefined;
    }
}