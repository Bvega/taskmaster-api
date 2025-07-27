// App entry. Boots Express, connects to MongoDB (Atlas), mounts routes, sets global handlers.

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const connectDB = require('./config/db');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Global middleware: security headers, CORS, JSON parser, request logging
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check (useful to confirm server boots)
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', ts: new Date().toISOString() });
});

// === Mount API routes (we start with users/auth) ===
app.use('/api/users', require('./routes/api/userRoutes'));

// 404 + centralized error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

(async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
