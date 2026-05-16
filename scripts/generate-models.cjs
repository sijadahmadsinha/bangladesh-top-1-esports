const fs = require('fs');
const path = require('path');

const entitiesDir = path.join('e:/top1', 'entities');
const modelsDir = path.join('e:/top1', 'server', 'models');

if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

const files = fs.readdirSync(entitiesDir).filter(f => f.endsWith('.db'));

const typeMap = {
  'string': 'String',
  'number': 'Number',
  'boolean': 'Boolean'
};

files.forEach(file => {
  const content = fs.readFileSync(path.join(entitiesDir, file), 'utf8');
  const schema = JSON.parse(content);
  const name = schema.name || file.replace('.db', '');
  
  let modelStr = 'const mongoose = require("mongoose");\n\n';
  modelStr += `const ${name}Schema = new mongoose.Schema({\n`;
  
  for (const [propName, propDef] of Object.entries(schema.properties || {})) {
    let mType = typeMap[propDef.type] || 'String';
    modelStr += `  ${propName}: { type: ${mType}`;
    
    if (schema.required && schema.required.includes(propName)) {
      modelStr += `, required: true`;
    }
    
    if (propDef.default !== undefined) {
      if (mType === 'String') {
        modelStr += `, default: "${propDef.default}"`;
      } else {
        modelStr += `, default: ${propDef.default}`;
      }
    }
    
    if (propDef.enum) {
      modelStr += `, enum: ${JSON.stringify(propDef.enum)}`;
    }
    
    modelStr += ` },\n`;
  }
  
  modelStr += `}, { timestamps: true });\n\n`;
  
  // Transform output to ensure the id matches what Base44 returns
  modelStr += `${name}Schema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});\n\n`;
  
  modelStr += `module.exports = mongoose.model("${name}", ${name}Schema);\n`;
  
  fs.writeFileSync(path.join(modelsDir, `${name}.js`), modelStr);
  console.log(`Created ${name}.js`);
});

// Also create User model for Admin authentication
const userModelStr = `const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String }
}, { timestamps: true });

UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("User", UserSchema);
`;
fs.writeFileSync(path.join(modelsDir, 'User.js'), userModelStr);
console.log('Created User.js');
