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
                connection.query(`SELECT email, name, password, createdAt FROM user WHERE id = ${useId}`, (error, results, fields) => {
                    if (error) {
                        reject(new Error('Request Query Error - get a user'));
                    }
                    resolve(results);
                });
            })
        }

        const result = await getUser(id);

        connection.end();

        return result.length > 0 ? result[0] : ['No Result'];
    }

    async findByEmail(email) {
        const connection = mysql.createConnection(dbConnection);
        
        const getUser = (email) => {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT email, password FROM user WHERE email = ${email}`, (error, results, fields) => {
                    if (error) {
                        reject(new Error('Request Query Error - get a user'));
                    }
                    resolve(results);
                });
            })
        }

        const result = await getUser(id);

        connection.end();

        return result.length > 0 ? result[0] : ['No Result'];
    }

    async save(user) {
        const connection = mysql.createConnection(dbConnection);

        const saveUser = (user) => {
            return new Promise((resolve, reject) => {
                connection.query(`INSERT INTO user (email, name, password, createdAt) VALUES (${user.email}, ${user.name}, ${user.password}, now())`, (error, results, fields) => {
                    if (error) {
                        reject(new Error('Request Query Error - save a user'));
                    }
                    resolve();
                });
            });
        }

        await saveUser(user);

        connection.end();
    }
}