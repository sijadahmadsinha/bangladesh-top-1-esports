const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  title: { type: String },
  type: { type: String, required: true, default: "photo", enum: ["photo","video","screenshot"] },
  url: { type: String, required: true },
  thumbnail_url: { type: String },
  category: { type: String, default: "Team Photo", enum: ["Team Photo","Tournament","Match Highlight","Behind the Scenes"] },
  date: { type: String },
}, { timestamps: true });

MediaSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Media", MediaSchema);
