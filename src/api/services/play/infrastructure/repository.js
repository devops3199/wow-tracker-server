import mysql from 'mysql';
import { dbConnection } from '../../../../shared/config.js';

export class playRepository {
    async findAll() {
        const connection = mysql.createConnection(dbConnection);

        const getAllPlay = () => {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT date, begin, end, dungeon, raid FROM play OREDER BY date)`, (error, results, fields) => {
                    if (error) {
                        reject(new Error('Request Query Error - get all play time'));
                    }
                    resolve();
                });
            });
        }

        await getAllPlay();

        connection.end();
    }
    
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