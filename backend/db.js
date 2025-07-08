import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const db = new pg.Client({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
});

export default {
    connect: () => {
        db.connect()
            .then(() => console.log("Connected to the database"))
            .catch(err => console.error("Connection error", err.stack));
    },
    query: (text, params) => {
        return db.query(text, params);
    },
    end: () => {
        return db.end();
    }
};