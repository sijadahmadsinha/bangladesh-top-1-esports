const mongoose = require('mongoose');

const ManagementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  image_url: { type: String },
  facebook_url: { type: String },
  discord_url: { type: String },
  youtube_url: { type: String },
  custom_url: { type: String },
  order: { type: Number, default: 0 },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

// Ensure id field is returned
ManagementSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Management', ManagementSchema);
