import mysql from 'mysql';
import { dbConnection } from '../../../../shared/config';

export class playRepository {
    async save(play) {
        const connection = mysql.createConnection(dbConnection);

        const savePlay = (play) => {
            return new Promise((resolve, reject) => {
                connection.query(`INSERT INTO play (date, begin, end, dungeon, raid) VALUES (${play.date}, ${play.begin}, ${play.end}, ${play.dungeon}, ${play.raid})`, (error, results, fields) => {
                    if (error) {
                        reject(new Error('Request Query Error - save play time'));
                    }
                    resolve();
                });
            });
        }

        await savePlay(play);

        connection.end();
    }
}