import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const db = new pg.Client({
  user:     process.env.DB_USER,
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port:     Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false // This is important for self-signed certificates
  }
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