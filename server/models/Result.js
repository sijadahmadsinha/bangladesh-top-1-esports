const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  tournament_name: { type: String, required: true },
  banner_url: { type: String },
  point_table_url: { type: String },
  result_image_url: { type: String },
  mvp_image_url: { type: String },
  date: { type: String },
  placement: { type: String },
  description: { type: String },
}, { timestamps: true });

ResultSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Result", ResultSchema);
