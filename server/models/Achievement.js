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

// Helper to parse prize_amount string (e.g. "$1,200", "5000", "500 USD") into a clean number
function parsePrizeAmount(prizeStr) {
  if (!prizeStr) return 0;
  const cleaned = prizeStr.replace(/[^\d.]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

// Hook to automatically create/update an Earning when an Achievement is saved
AchievementSchema.post("save", async function(doc) {
  try {
    const Earning = mongoose.model("Earning");
    const amount = parsePrizeAmount(doc.prize_amount);

    if (amount > 0) {
      const existing = await Earning.findOne({ achievement_id: doc._id });
      if (existing) {
        existing.tournament_name = doc.tournament_name || doc.title || "Unnamed Tournament";
        existing.placement = doc.placement;
        existing.amount = amount;
        existing.date = doc.date;
        existing.banner_url = doc.image_url;
        await existing.save();
        console.log(`✨ Auto-updated linked Earning for achievement: ${doc._id}`);
      } else {
        const newEarning = new Earning({
          tournament_name: doc.tournament_name || doc.title || "Unnamed Tournament",
          placement: doc.placement,
          amount: amount,
          currency: "USD",
          date: doc.date,
          banner_url: doc.image_url,
          achievement_id: doc._id
        });
        await newEarning.save();
        console.log(`✨ Auto-created linked Earning for achievement: ${doc._id}`);
      }
    } else {
      // If amount is 0 or invalid, ensure any linked Earning is removed
      await Earning.deleteOne({ achievement_id: doc._id });
    }
  } catch (err) {
    console.error("Error in Achievement post-save auto-earnings hook:", err);
  }
});

// Hook to automatically delete the linked Earning when an Achievement is deleted
AchievementSchema.post("findOneAndDelete", async function(doc) {
  if (doc) {
    try {
      const Earning = mongoose.model("Earning");
      await Earning.deleteOne({ achievement_id: doc._id });
      console.log(`🗑️ Auto-deleted linked Earning for achievement: ${doc._id}`);
    } catch (err) {
      console.error("Error in Achievement post-delete auto-earnings hook:", err);
    }
  }
});

module.exports = mongoose.model("Achievement", AchievementSchema);
