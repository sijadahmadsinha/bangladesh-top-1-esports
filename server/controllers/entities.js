const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Dynamically load all models if not already loaded
const modelsDir = path.join(__dirname, '../models');
fs.readdirSync(modelsDir).forEach(file => {
  if (file.endsWith('.js')) {
    require(path.join(modelsDir, file));
  }
});

// Helper to get a model by entity name. 
const getModel = (entityName) => {
  // 1. Try exact match
  if (mongoose.models[entityName]) return mongoose.models[entityName];
  
  // 2. Try plural to singular conversion
  let singularName = entityName;
  if (entityName.endsWith('ies')) {
    singularName = entityName.slice(0, -3) + 'y'; 
  } else if (entityName.endsWith('s')) {
    singularName = entityName.slice(0, -1);
  }

  // 3. Try exact match with singular
  if (mongoose.models[singularName]) return mongoose.models[singularName];

  // 4. Try Capitalized singular (Most common for Mongoose models)
  const capitalized = singularName.charAt(0).toUpperCase() + singularName.slice(1);
  if (mongoose.models[capitalized]) return mongoose.models[capitalized];

  // 5. Case-insensitive search through all registered models
  const found = Object.keys(mongoose.models).find(m => m.toLowerCase() === singularName.toLowerCase());
  if (found) return mongoose.models[found];
  
  throw new Error(`Model for entity ${entityName} not found. Available models: ${Object.keys(mongoose.models).join(', ')}`);
};

exports.list = async (req, res) => {
  try {
    const Model = getModel(req.params.entityName);
    const { limit = 50, page = 1, sort = '-createdAt', ...query } = req.query;

    let parsedQuery = { ...query };

    const items = await Model.find(parsedQuery)
      .sort(sort)
      .limit(parseInt(limit, 10))
      .skip((parseInt(page, 10) - 1) * parseInt(limit, 10));

    const total = await Model.countDocuments(parsedQuery);

    // Convert to JSON to apply the id transform
    const itemsJson = items.map(item => {
      const json = item.toJSON();
      if (req.params.entityName === 'Achievement' && item._id) {
        console.log(`Achievement "${json.title}" toJSON:`, json);
      }
      return json;
    });

    res.json({
      items: itemsJson,
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10)
    });
  } catch (err) {
    console.error('List error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { entityName } = req.params;
  console.log(`🆕 Creating new ${entityName}:`, req.body);
  try {
    const Model = getModel(entityName);
    const item = new Model(req.body);
    await item.save();
    console.log(`✅ Created successfully: ${item._id}`);
    res.status(201).json(item.toJSON());
  } catch (err) {
    console.error('❌ Create error:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const Model = getModel(req.params.entityName);
    const item = await Model.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item.toJSON());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { entityName, id } = req.params;
  console.log(`📝 Updating ${entityName} (${id}):`, req.body);
  try {
    const Model = getModel(entityName);
    const item = await Model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!item) {
      console.log(`⚠️ Item not found for update: ${id}`);
      return res.status(404).json({ error: 'Not found' });
    }
    console.log(`✅ Updated successfully: ${id}`);
    res.json(item.toJSON());
  } catch (err) {
    console.error('❌ Update error:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { entityName, id } = req.params;
  console.log(`🗑️ Attempting to delete ${entityName} with ID: ${id}`);
  try {
    const Model = getModel(entityName);
    const item = await Model.findByIdAndDelete(id);
    if (!item) {
      console.log(`⚠️ Item not found for deletion: ${id}`);
      return res.status(404).json({ error: 'Not found' });
    }
    console.log(`✅ Successfully deleted ${entityName}: ${id}`);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ error: err.message });
  }
};
