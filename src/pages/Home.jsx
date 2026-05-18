import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import FeaturedPlayers from '../components/home/FeaturedPlayers';
import UpcomingTournaments from '../components/home/UpcomingTournaments';
import AchievementsPreview from '../components/home/AchievementsPreview';
import EarningsPreview from '../components/home/EarningsPreview';
import SponsorsSection from '../components/home/SponsorsSection';
import DiscordSection from '../components/home/DiscordSection';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />
      
      {/* Wrapper to cover the global fixed background with the default matte black color */}
      <div className="relative z-10 bg-obsidian">
        <FeaturedPlayers />
        <UpcomingTournaments />
        <AchievementsPreview />
        <EarningsPreview />
        <SponsorsSection />
        <DiscordSection />
      </div>
    </motion.div>
  );
}