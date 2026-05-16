require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB FIRST
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/top1-esports', {
  tls: true,
  tlsAllowInvalidCertificates: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');

  // Register ALL models first
  const modelsDir = path.join(__dirname, 'models');
  fs.readdirSync(modelsDir).forEach(file => {
    if (file.endsWith('.js')) {
      require(path.join(modelsDir, file));
    }
  });
  console.log('✅ Models registered');

  // Load routes AFTER models are registered
  const apiRoutes = require('./routes/api');
  app.use('/api', apiRoutes);

  // Global Error Handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});
