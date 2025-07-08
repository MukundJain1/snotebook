import express from 'express';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/api/auth', authRoutes); // here this path /api/auth is prefix for all routes in auth.js
app.use('/api/notes', notesRoutes); // assuming notes routes are also in authRoutes, otherwise import and use separately

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});