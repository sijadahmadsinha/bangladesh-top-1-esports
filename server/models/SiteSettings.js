const mongoose = require("mongoose");

const SiteSettingsSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

SiteSettingsSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("SiteSettings", SiteSettingsSchema);
