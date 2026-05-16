import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Clock, ChevronDown, Youtube, User } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

export default function TournamentCard({ tournament, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.6 }}
      className="micro-border bg-graphene overflow-hidden"
    >
      {/* Main row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4 group hover:bg-white/5 transition-colors text-left min-h-0"
        data-cursor-expand
      >
        <div className="flex items-center gap-4">
          {tournament.banner_url && (
            <img
              src={tournament.banner_url}
              alt=""
              className="w-12 h-12 object-cover opacity-80 group-hover:opacity-100 transition-all flex-shrink-0"
              loading="lazy"
            />
          )}
          <div>
            <p className="font-heading font-semibold text-silver">{tournament.name}</p>
            {tournament.organizer && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-steel mt-1">
                <User size={10} /> {tournament.organizer}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          {tournament.date && (
            <span className="flex items-center gap-1.5 font-mono text-xs text-steel">
              <CalendarDays size={12} /> {tournament.date}
            </span>
          )}
          {tournament.time && (
            <span className="flex items-center gap-1.5 font-mono text-xs text-steel">
              <Clock size={12} /> {tournament.time}
            </span>
          )}
          {tournament.prize_pool && (
            <span className="font-mono text-xs text-silver/70">{tournament.prize_pool}</span>
          )}
          <StatusBadge status={tournament.status} />
          <ChevronDown
            size={16}
            className={`text-steel transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-silver/5"
          >
            <div className="p-5 space-y-4">
              {tournament.description && (
                <p className="font-body text-muted-foreground text-sm">{tournament.description}</p>
              )}
              {tournament.youtube_link && (
                <div>
                  <p className="font-mono text-xs text-steel tracking-ultra uppercase mb-3">Live Stream</p>
                  <div className="aspect-video w-full max-w-2xl">
                    <iframe
                      src={tournament.youtube_link.replace('watch?v=', 'embed/')}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={tournament.name}
                    />
                  </div>
                </div>
              )}
              {tournament.placement && (
                <div className="flex items-center gap-3 pt-2">
                  <span className="font-mono text-xs text-steel tracking-ultra uppercase">Result:</span>
                  <span className="font-mono text-xs text-silver">{tournament.placement}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}