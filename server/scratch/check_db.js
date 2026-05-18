require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, '../models');
fs.readdirSync(modelsDir).forEach(file => {
  if (file.endsWith('.js')) {
    require(path.join(modelsDir, file));
  }
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/top1-esports', {
  tls: true,
  tlsAllowInvalidCertificates: true,
})
.then(async () => {
  console.log('✅ Connected to MongoDB');
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('Collections in database:');
  for (let col of collections) {
    const count = await mongoose.connection.db.collection(col.name).countDocuments();
    console.log(`- ${col.name}: ${count} documents`);
  }
  process.exit(0);
})
.catch(err => {
  console.error('❌ Connection error:', err);
  process.exit(1);
});
