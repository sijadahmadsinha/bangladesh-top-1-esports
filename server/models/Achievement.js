const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tournament_name: { type: String },
  image_url: { type: String },
  date: {
    type: String,
    set: function(value) {
      if (!value) return null;

      // If it's already a string in DD/MM/YYYY format, return as-is
      if (typeof value === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(value.trim())) {
        return value.trim();
      }

      // If it's a Date object, convert to DD/MM/YYYY
      if (value instanceof Date) {
        const day = String(value.getDate()).padStart(2, '0');
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const year = value.getFullYear();
        return `${day}/${month}/${year}`;
      }

      // Try parsing YYYY-MM-DD format
      if (typeof value === 'string') {
        const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (match) {
          return `${match[3]}/${match[2]}/${match[1]}`;
        }
      }

      // Try parsing as a date and converting
      const parsed = new Date(value);
      if (!isNaN(parsed.getTime())) {
        const day = String(parsed.getDate()).padStart(2, '0');
        const month = String(parsed.getMonth() + 1).padStart(2, '0');
        const year = parsed.getFullYear();
        return `${day}/${month}/${year}`;
      }

      return value;
    },
    get: function(value) {
      // When retrieving, ensure it's in a sortable format for Mongoose
      if (!value) return null;

      if (typeof value === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(value.trim())) {
        // Convert DD/MM/YYYY to a Date object for proper sorting
        const [day, month, year] = value.trim().split('/');
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      }

      return value instanceof Date ? value : new Date(value);
    }
  },
  placement: { type: String, required: true, default: "1st Place" },
  prize_amount: { type: String },
  description: { type: String },
}, { timestamps: true });

AchievementSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    // Ensure date is always returned in DD/MM/YYYY format
    if (ret.date) {
      if (ret.date instanceof Date) {
        const day = String(ret.date.getDate()).padStart(2, '0');
        const month = String(ret.date.getMonth() + 1).padStart(2, '0');
        const year = ret.date.getFullYear();
        ret.date = `${day}/${month}/${year}`;
      }
      // If it's a string, keep it as-is (should already be in DD/MM/YYYY format)
    }
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
