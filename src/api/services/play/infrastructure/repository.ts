import mysql from 'mysql';
import { dbConnection } from '../../../../shared/config';
import { Play } from '../domain/model';

export class playRepository {
    async findAll() {
        const connection = mysql.createConnection(dbConnection);

        const getAllPlay = (): Promise<string[]> => {
            return new Promise((resolve, reject) => {
                connection.query(`SELECT date, begin, end, dungeon, raid FROM play OREDER BY date)`, (error, results, fields) => {
                    if (error) {
                        reject(new Error('Request Query Error - get all play time'));
                    }
                    resolve(results);
                });
            });
        }
        connection.end();

        return await getAllPlay();
    }
    
    async save(play: Play) {
        const connection = mysql.createConnection(dbConnection);

        const savePlay = (play: Play): Promise<void> => {
            return new Promise((resolve, reject) => {
                connection.query(`INSERT INTO play (date, begin, end, dungeon, raid) VALUES (${play.date}, ${play.begin}, ${play.end}, ${play.dungeon}, ${play.raid})`, (error, results, fields) => {
                    if (error) {
                        reject(new Error('Request Query Error - save play time'));
                    }
                    resolve(results);
                });
            });
        }

        await savePlay(play);

        connection.end();
    }
}