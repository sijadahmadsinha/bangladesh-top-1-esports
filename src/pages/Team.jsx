import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import SectionHeader from '../components/ui/SectionHeader';
import LoadingScreen from '../components/ui/LoadingScreen';
import { Facebook, Youtube, Music, Target, Trophy, TrendingUp } from 'lucide-react';

function PlayerCard({ player, index }) {
  const kdRatio = player.matches_played > 0 ? (player.kills / player.matches_played).toFixed(1) : '0.0';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="micro-border bg-graphene overflow-hidden group relative"
      data-cursor-expand
    >
      <Link to={`/player/${player.id}`} className="absolute inset-0 z-10" aria-label={`View ${player.ign} profile`} />
      
      {/* Split panel layout */}
      <div className="flex flex-col sm:flex-row">
        {/* Portrait */}
        <div className="sm:w-48 aspect-[3/4] sm:aspect-auto relative overflow-hidden flex-shrink-0">
          {player.image_url ? (
            <img
              src={player.image_url}
              alt={player.ign}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full min-h-[200px] bg-gradient-to-br from-graphene to-obsidian flex items-end p-4">
              <span className="font-display text-7xl font-bold text-silver/10">{player.ign?.[0]}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-graphene opacity-0 sm:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-graphene/80 to-transparent sm:hidden" />
        </div>

        {/* Info */}
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-mono text-xs text-steel tracking-ultra uppercase">{player.role}</p>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-mono text-[8px] text-silver tracking-ultra uppercase">View Profile</span>
                <div className="w-4 h-px bg-silver/40" />
              </div>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-silver mb-1">{player.ign}</h3>
            {player.real_name && (
              <p className="font-body text-xs text-steel mb-3">{player.real_name}</p>
            )}
            
            {/* Stat Preview */}
            <div className="flex items-center gap-4 mt-4 py-3 border-y border-silver/5">
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-steel tracking-ultra uppercase mb-1">Kills</span>
                <span className="font-heading text-sm text-silver font-bold">{player.kills || 0}</span>
              </div>
              <div className="w-px h-6 bg-silver/5" />
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-steel tracking-ultra uppercase mb-1">K/D</span>
                <span className="font-heading text-sm text-silver font-bold">{kdRatio}</span>
              </div>
              <div className="w-px h-6 bg-silver/5" />
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-steel tracking-ultra uppercase mb-1">Booyahs</span>
                <span className="font-heading text-sm text-tactical-green font-bold">{player.booyahs || 0}</span>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-5 pt-5 border-t border-silver/5">
            <div className="flex items-center gap-3 relative z-20">
              {player.facebook_url && (
                <a href={player.facebook_url} target="_blank" rel="noopener noreferrer"
                  className="text-steel hover:text-silver transition-colors min-h-0 p-1">
                  <Facebook size={14} />
                </a>
              )}
              {player.youtube_url && (
                <a href={player.youtube_url} target="_blank" rel="noopener noreferrer"
                  className="text-steel hover:text-silver transition-colors min-h-0 p-1">
                  <Youtube size={14} />
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Player.filter({ is_active: true }, 'order')
      .then(setPlayers).finally(() => setLoading(false));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-40 pb-15 lg:pb-32">
        <SectionHeader
          label="The Roster"
          title="TOP-1 Players"
          subtitle="The individuals behind the victories. Elite competitors, strategic minds, relentless performers."
        />

        {loading ? <LoadingScreen /> : (
          players.length === 0 ? (
            <div className="text-center py-15">
              <p className="font-mono text-xs text-steel tracking-ultra uppercase">No players added yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {players.map((p, i) => <PlayerCard key={p.id} player={p} index={i} />)}
            </div>
          )
        )}
      </div>
    </motion.div>
  );
}