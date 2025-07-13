import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import db from './db.js';

const app = express();
const PORT = 5000;

// Whitelisted origins allowed to access your API
const allowedOrigins = [
  'http://localhost:3000',
  'https://snotebook-uwg4.onrender.com',
  'https://snotebook-psi.vercel.app',
  'https://snotebook-ana726qk3-mukundjain1s-projects.vercel.app',
];

// Enable CORS for all routes
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'auth-token'],
}));

// Ensure preflight OPTIONS requests get handled
app.options('*', cors());

// Connect to DB
db.connect();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
