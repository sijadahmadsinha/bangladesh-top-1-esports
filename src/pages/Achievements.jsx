import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import SectionHeader from '../components/ui/SectionHeader';
import LoadingScreen from '../components/ui/LoadingScreen';
import { Trophy } from 'lucide-react';
import { formatDate } from '@/utils';

function AchievementCard({ achievement, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="micro-border bg-graphene overflow-hidden group"
      data-cursor-expand
    >
      {/* Image */}
      <div className="aspect-video relative overflow-hidden">
        {achievement.image_url ? (
          <img
            src={achievement.image_url}
            alt={achievement.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-graphene to-obsidian flex items-center justify-center">
            <Trophy size={40} className="text-silver/10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-graphene/90 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          {achievement.placement && (
            <span className={`font-mono text-xs px-2 py-1 border ${
              achievement.placement === '1st Place'
                ? 'bg-[#EF4444] text-white border-[#EF4444]'
                : 'bg-white text-[#EF4444] border-white'
            }`}>
              {achievement.placement}
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-heading font-semibold text-silver text-lg mb-1">{achievement.title}</h3>
        <p className="font-body text-sm text-muted-foreground">{achievement.tournament_name}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-silver/5">
          {achievement.date && <span className="font-mono text-xs text-steel">{formatDate(achievement.date)}</span>}
          {achievement.prize_amount && (
            <span className="font-mono text-sm text-silver font-semibold">{achievement.prize_amount}</span>
          )}
        </div>
        {achievement.description && (
          <p className="font-body text-xs text-muted-foreground mt-3">{achievement.description}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    base44.entities.Achievement.list('-date').then(setAchievements).finally(() => setLoading(false));
  }, []);

  const placements = ['All', '1st Place', '2nd Place', '3rd Place', 'MVP', 'Top 5', 'Special Award'];
  const filtered = filter === 'All' ? achievements : achievements.filter(a => a.placement === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-40 pb-15 lg:pb-32">
        <SectionHeader
          label="Trophy Cabinet"
          title="Achievements"
          subtitle="A record of excellence — every podium, every MVP, every milestone."
        />

        {/* Stats bar */}
        {achievements.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-12 bg-silver/5">
            {[
              { label: '1st Place', count: achievements.filter(a => a.placement === '1st Place').length },
              { label: '2nd Place', count: achievements.filter(a => a.placement === '2nd Place').length },
              { label: 'MVP', count: achievements.filter(a => a.placement === 'MVP').length },
              { label: 'Total', count: achievements.length },
            ].map(({ label, count }) => (
              <div key={label} className="bg-graphene p-5 text-center">
                <p className="font-mono text-3xl text-silver font-semibold">{count}</p>
                <p className="font-mono text-xs text-steel tracking-widest uppercase mt-1">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Filter */}
        <div className="flex flex-wrap gap-1 mb-10">
          {placements.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs px-3 py-2 tracking-widest uppercase transition-all min-h-0 border ${
                filter === f ? 'border-silver/30 text-white bg-silver/5' : 'border-transparent text-red-600 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? <LoadingScreen /> : (
          filtered.length === 0 ? (
            <div className="text-center py-15">
              <p className="font-mono text-xs text-steel tracking-ultra uppercase">No achievements yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((a, i) => <AchievementCard key={a.id} achievement={a} index={i} />)}
            </div>
          )
        )}
      </div>
    </motion.div>
  );
}