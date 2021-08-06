import { dbConnection } from "../../../../shared/config";
import mysql from 'mysql';

const connection = mysql.createConnection(dbConnection);

connection.connection((err) => {
    if(err) {
        console.log('error: ' + err.stack );
        return;
    }

    console.log('connected as id ' + connection.threadId);
})