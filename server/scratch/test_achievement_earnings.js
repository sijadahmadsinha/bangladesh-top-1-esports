require('dotenv').config();
const mongoose = require('mongoose');
const Achievement = require('../models/Achievement');
const Earning = require('../models/Earning');

const test = async () => {
  try {
    console.log('Connecting to:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, {
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log('✅ Connected to MongoDB');

    // 1. Create a test Achievement
    console.log('\n--- Test 1: Creating Achievement ---');
    const achievement = new Achievement({
      title: 'FF Pro League Champion',
      tournament_name: 'FF Pro League Season 5',
      placement: '1st Place',
      prize_amount: '$1,500 USD',
      date: '2026-05-20',
      description: 'Defeated top esports rosters in the region.'
    });
    await achievement.save();
    console.log('✅ Saved achievement:', achievement._id);

    // Wait a brief moment for database operations
    await new Promise(resolve => setTimeout(resolve, 500));

    // Verify linked Earning was created
    const earning = await Earning.findOne({ achievement_id: achievement._id });
    if (earning) {
      console.log('✅ Linked Earning automatically created:');
      console.log('   Tournament:', earning.tournament_name);
      console.log('   Placement:', earning.placement);
      console.log('   Amount:', earning.amount);
      console.log('   Currency:', earning.currency);
      console.log('   Date:', earning.date);
    } else {
      throw new Error('❌ Linked Earning was not created');
    }

    // 2. Update the Achievement
    console.log('\n--- Test 2: Updating Achievement prize_amount ---');
    achievement.prize_amount = '$2,500 USD';
    achievement.tournament_name = 'FF Pro League Season 5 (Grand Finals)';
    await achievement.save();
    console.log('✅ Updated achievement');

    await new Promise(resolve => setTimeout(resolve, 500));

    // Verify Earning was updated
    const updatedEarning = await Earning.findOne({ achievement_id: achievement._id });
    if (updatedEarning && updatedEarning.amount === 2500) {
      console.log('✅ Linked Earning automatically updated:');
      console.log('   Updated Tournament:', updatedEarning.tournament_name);
      console.log('   Updated Amount:', updatedEarning.amount);
    } else {
      throw new Error('❌ Linked Earning did not update correctly');
    }

    // 3. Delete the Achievement
    console.log('\n--- Test 3: Deleting Achievement ---');
    await Achievement.findByIdAndDelete(achievement._id);
    console.log('✅ Deleted achievement');

    await new Promise(resolve => setTimeout(resolve, 500));

    // Verify Earning was deleted
    const deletedEarning = await Earning.findOne({ achievement_id: achievement._id });
    if (!deletedEarning) {
      console.log('✅ Linked Earning automatically deleted successfully');
    } else {
      throw new Error('❌ Linked Earning was not deleted');
    }

    console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! Automated tracking is 100% correct.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during testing:', err);
    process.exit(1);
  }
};

test();
