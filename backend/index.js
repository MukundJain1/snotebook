import express from 'express';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = 5000;

const allowedOrigins = [
  'http://localhost:3000',
  'https://snotebook-uwg4.onrender.com',
  'https://snotebook-ana726qk3-mukundjain1s-projects.vercel.app',
  'https://snotebook-psi.vercel.app',
];

db.connect();
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'auth-token'], // Specify allowed headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/api/auth', authRoutes); // here this path /api/auth is prefix for all routes in auth.js
app.use('/api/notes', notesRoutes); // assuming notes routes are also in authRoutes, otherwise import and use separately

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});