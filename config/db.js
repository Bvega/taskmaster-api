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

  // Retry-friendly options
  const opts = {
    autoIndex: true,
    maxPoolSize: 10
  };

  await mongoose.connect(uri, opts);
  return mongoose.connection;
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB connection closed due to app termination');
  process.exit(0);
});

module.exports = connectDB;
