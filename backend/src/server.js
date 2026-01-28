import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import translationRoutes from './routes/translations.js';
import conversationRoutes from './routes/conversations.js';
import learningRoutes from './routes/learning.js';
import signRoutes from './routes/signs.js';

import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(rateLimiter.general);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/translations', translationRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/signs', signRoutes);

// Error handler
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint not found',
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 UniBridge API running on http://localhost:${PORT}`);
});

export default app;