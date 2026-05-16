import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import SectionHeader from '../ui/SectionHeader';

export default function FeaturedPlayers() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    base44.entities.Player.filter({ is_active: true }, 'order', 6).then(setPlayers).catch(() => {});
  }, []);

  if (!players.length) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-16 py-15">
      <div className="flex items-end justify-between mb-10">
        <SectionHeader label="The Roster" title="Meet The Players" />
        <Link to="/team" className="font-mono text-xs text-steel hover:text-silver tracking-ultra uppercase transition-colors hidden md:flex items-center gap-2 min-h-0">
          Full Roster →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {players.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="micro-border bg-graphene group cursor-pointer overflow-hidden"
            data-cursor-expand
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              {p.image_url ? (
                <img
                  src={p.image_url}
                  alt={p.ign}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-graphene to-obsidian flex items-end p-3">
                  <span className="font-mono text-4xl font-bold text-silver/10">{p.ign?.[0]}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-graphene/90 via-transparent to-transparent" />
            </div>
            <div className="p-3">
              <p className="font-heading font-semibold text-silver text-sm truncate">{p.ign}</p>
              <p className="font-mono text-xs text-steel mt-0.5">{p.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}