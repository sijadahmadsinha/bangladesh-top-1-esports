import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { formatDate, optimizeImageUrl } from '@/utils';
import SectionHeader from '../ui/SectionHeader';
import PlacementBadge from '../ui/PlacementBadge';
import { Trophy } from 'lucide-react';

export default function AchievementsPreview() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    base44.entities.Achievement.list('-date', 6).then(setAchievements).catch(() => {});
  }, []);

  if (!achievements.length) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-16 py-15 micro-border-t">
      <div className="flex items-end justify-between mb-10">
        <SectionHeader label="Legacy" title="Achievements" />
        <Link to="/achievements" className="font-mono text-xs text-steel hover:text-silver tracking-ultra uppercase transition-colors hidden md:flex items-center gap-2 min-h-0">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="micro-border bg-graphene p-5 group hover:bg-white/5 transition-colors"
          >
            <div className="flex items-start gap-4">
              {a.image_url ? (
                <img src={optimizeImageUrl(a.image_url)} alt="" className="w-12 h-12 object-cover opacity-80" />
              ) : (
                <div className="w-12 h-12 bg-silver/5 flex items-center justify-center border border-silver/10">
                  <Trophy size={20} className="text-steel" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold text-silver text-sm truncate">{a.title}</p>
                <p className="font-body text-xs text-muted-foreground mt-0.5 truncate">{a.tournament_name}</p>
                <div className="flex items-center gap-3 mt-2">
                  {a.placement && <PlacementBadge placement={a.placement} />}
                  {a.date && <span className="font-mono text-xs text-steel">{formatDate(a.date)}</span>}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}