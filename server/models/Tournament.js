const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organizer: { type: String },
  banner_url: { type: String },
  date: { type: String },
  time: { type: String },
  status: { type: String, required: true, default: "Upcoming", enum: ["Upcoming","Live","Finished"] },
  type: { type: String, required: true, default: "Official", enum: ["Official","Unofficial"] },
  youtube_link: { type: String },
  prize_pool: { type: String },
  description: { type: String },
  placement: { type: String },
}, { timestamps: true });

TournamentSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Tournament", TournamentSchema);
