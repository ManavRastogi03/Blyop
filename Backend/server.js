import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/Database/index.js';
import authRoutes from './src/routes/authRoutes.js';
import cardRoute from './src/routes/cardRoutes.js'
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cards',cardRoute)


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});