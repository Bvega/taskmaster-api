// MongoDB (Mongoose) connection helper with basic logging and fail-fast on missing URI.

const mongoose = require('mongoose');

async function connectDB(uri) {
  if (!uri) {
    console.error('❌ MONGO_URI is missing. Set it in your .env file.');
    process.exit(1);
  }

  mongoose.connection.on('connected', () => {
    console.log('🗄️  MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected');
  });

  await mongoose.connect(uri, {
    autoIndex: true,   // OK for dev; consider turning off in prod
    maxPoolSize: 10
  });

  return mongoose.connection;
}

// Graceful shutdown for Ctrl+C
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB connection closed due to app termination');
  process.exit(0);
});

module.exports = connectDB;
