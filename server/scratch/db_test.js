require('dotenv').config();
const mongoose = require('mongoose');

const test = async () => {
  try {
    console.log('Connecting to:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, {
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log('✅ Connected');
    
    const TestSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', TestSchema);
    
    console.log('Saving test item...');
    const item = new TestModel({ name: 'Test ' + new Date().toISOString() });
    await item.save();
    console.log('✅ Saved successfully:', item._id);
    
    await TestModel.deleteOne({ _id: item._id });
    console.log('✅ Cleaned up');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

test();
