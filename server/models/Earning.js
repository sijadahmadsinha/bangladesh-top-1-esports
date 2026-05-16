const mongoose = require("mongoose");

const EarningSchema = new mongoose.Schema({
  tournament_name: { type: String, required: true },
  placement: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: "BDT" },
  date: { type: String },
  banner_url: { type: String },
}, { timestamps: true });

EarningSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Earning", EarningSchema);
