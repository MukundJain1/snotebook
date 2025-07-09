import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
} = process.env;

const db = new pg.Client({
  user:     DB_USER,
  host:     DB_HOST,
  database: DB_NAME,
  password: DB_PASS,
  port:     Number(DB_PORT),
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