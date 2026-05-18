const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  ign: { type: String, required: true },
  real_name: { type: String },
  role: { type: String, required: true, default: "Rusher", enum: ["IGL","Rusher","Sniper","Support","Bomber","All-rounder","Coach","Manager","Rifler"] },
  country: { type: String, default: "Bangladesh" },
  image_url: { type: String },
  bio: { type: String },
  uid: { type: String }, // In-game UID
  matches_played: { type: Number, default: 0 },
  kills: { type: Number, default: 0 },
  booyahs: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
  
  // Social Links
  facebook_url: { type: String },
  youtube_url: { type: String },
  tiktok_url: { type: String },
  instagram_url: { type: String },
  
  // Achievements (Array of objects)
  achievements: [{
    title: String,
    event: String,
    date: String,
    placement: String
  }],
  
  is_active: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  jersey_number: { type: String },
}, { timestamps: true });

PlayerSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Player", PlayerSchema);
