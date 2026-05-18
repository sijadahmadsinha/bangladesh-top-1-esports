import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import SectionHeader from '../components/ui/SectionHeader';
import LoadingScreen from '../components/ui/LoadingScreen';
import TournamentCard from '../components/tournaments/TournamentCard';

export default function OfficialTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    base44.entities.Tournament.filter({ type: 'Official' }, '-date')
      .then(setTournaments).finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'All' ? tournaments : tournaments.filter(t => t.status === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-40 pb-15 lg:pb-32">
        <SectionHeader
          label="Official Circuit"
          title="Official Tournaments"
          subtitle="Sanctioned competitive events and major league appearances."
        />

        {/* Filter tabs */}
        <div className="flex gap-1 mb-10 border-b border-silver/10 pb-4">
          {['All', 'Upcoming', 'Live', 'Finished'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs px-4 py-2 tracking-widest uppercase transition-all min-h-0 ${
                filter === f ? 'text-white border-b border-silver' : 'text-red-600 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? <LoadingScreen /> : (
          filtered.length === 0 ? (
            <div className="text-center py-15">
              <p className="font-mono text-xs text-steel tracking-ultra uppercase">No tournaments found</p>
            </div>
          ) : (
            <div className="space-y-px">
              {filtered.map((t, i) => <TournamentCard key={t.id} tournament={t} index={i} />)}
            </div>
          )
        )}
      </div>
    </motion.div>
  );
}