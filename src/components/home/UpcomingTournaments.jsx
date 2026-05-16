import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge';
import SectionHeader from '../ui/SectionHeader';
import { CalendarDays, Clock } from 'lucide-react';

export default function UpcomingTournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    base44.entities.Tournament.filter({ status: 'Upcoming' }, '-created_date', 4)
      .then(setTournaments).catch(() => {});
  }, []);

  if (!tournaments.length) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-16 py-15 micro-border-t">
      <div className="flex items-end justify-between mb-10">
        <SectionHeader label="Schedule" title="Upcoming Tournaments" />
        <Link to="/official-tournaments" className="font-mono text-xs text-steel hover:text-silver tracking-ultra uppercase transition-colors hidden md:flex items-center gap-2 min-h-0">
          All Tournaments →
        </Link>
      </div>

      <div className="space-y-px">
        {tournaments.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-graphene micro-border hover:bg-white/5 transition-colors duration-300 group"
            data-cursor-expand
          >
            <div className="flex items-start sm:items-center gap-4">
              {t.banner_url && (
                <img src={t.banner_url} alt="" className="w-12 h-12 object-cover opacity-80 group-hover:opacity-100 transition-all" />
              )}
              <div>
                <p className="font-heading font-semibold text-silver">{t.name}</p>
                {t.organizer && <p className="font-body text-sm text-muted-foreground mt-0.5">{t.organizer}</p>}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-3 sm:mt-0">
              {t.date && (
                <span className="flex items-center gap-2 font-mono text-xs text-steel">
                  <CalendarDays size={12} />
                  {t.date}
                </span>
              )}
              {t.time && (
                <span className="flex items-center gap-2 font-mono text-xs text-steel">
                  <Clock size={12} />
                  {t.time}
                </span>
              )}
              <StatusBadge status={t.status} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}