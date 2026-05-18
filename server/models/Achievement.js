const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tournament_name: { type: String },
  image_url: { type: String },
  date: { type: String },
  placement: { type: String, required: true, default: "1st Place" },
  prize_amount: { type: String },
  description: { type: String },
}, { timestamps: true });

AchievementSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Achievement", AchievementSchema);
