// Mock localStorage for Base44 SDK
if (typeof global.window === 'undefined') {
  global.window = {
    location: { search: '' },
    addEventListener: () => {}
  };
}
if (typeof global.document === 'undefined') {
  global.document = { referrer: '' };
}
global.window.localStorage = {
  getItem: (key) => {
    if (key === 'base44_access_token' || key === 'token' || key === 'base44_top1_esports_token') return process.env.BASE44_TOKEN;
    return null;
  },
  setItem: () => {},
  removeItem: () => {}
};
global.localStorage = global.window.localStorage;

const mongoose = require('mongoose');
const { createClient } = require('@base44/sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Load models
const modelsDir = path.join(__dirname, '../models');
fs.readdirSync(modelsDir).forEach(file => {
  if (file.endsWith('.js')) {
    require(path.join(modelsDir, file));
  }
});

const base44 = createClient({
  appId: process.env.VITE_BASE44_APP_ID || '6a05a61745f59257bf73f45a',
  token: process.env.BASE44_TOKEN,
  functionsVersion: process.env.VITE_BASE44_FUNCTIONS_VERSION || 'v1',
  serverUrl: 'https://base44.app',
  requiresAuth: !!process.env.BASE44_TOKEN
});

const migrateEntity = async (entityName) => {
  console.log(`Migrating ${entityName}...`);
  try {
    const items = await base44.entities[entityName].list();
    if (!items || items.length === 0) {
      console.log(`No items found for ${entityName}`);
      return;
    }
    
    const Model = mongoose.models[entityName];
    if (!Model) {
      console.error(`Model not found for ${entityName}`);
      return;
    }

    // Clean up IDs and convert strings to Date if needed, then save to Mongo
    for (let item of items) {
      if (item._id && mongoose.Types.ObjectId.isValid(item._id)) {
        item._id = new mongoose.Types.ObjectId(item._id);
      } else {
        delete item._id; 
      }
      
      const newDoc = new Model(item);
      await newDoc.save().catch(e => {
        if(e.code === 11000) {
           return Model.findByIdAndUpdate(item._id, item, {new: true});
        }
        console.error(`Error saving item:`, e.message);
      });
    }
    console.log(`Migrated ${items.length} items for ${entityName}`);
  } catch (err) {
    console.error(`Error migrating ${entityName}:`, err.message);
  }
};

const runMigration = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("Please set MONGODB_URI in your .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true,
  });
  console.log('✅ Connected to MongoDB');

  const entitiesToMigrate = ['Player', 'Tournament', 'Result', 'Achievement', 'Earning', 'Media', 'SiteSetting'];

  for (let entity of entitiesToMigrate) {
    await migrateEntity(entity);
  }

  console.log('✅ Migration complete');
  process.exit(0);
};

runMigration();
