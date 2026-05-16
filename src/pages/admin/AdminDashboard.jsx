import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Users, Trophy, DollarSign, Image, Medal, ArrowRight } from 'lucide-react';

function StatCard({ label, count, icon: Icon, path, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      <Link to={path} className="block micro-border bg-graphene p-6 group hover:bg-white/5 transition-colors min-h-0">
        <div className="flex items-start justify-between mb-4">
          <Icon size={20} className="text-steel group-hover:text-silver transition-colors" />
          <ArrowRight size={14} className="text-steel/0 group-hover:text-steel transition-all" />
        </div>
        <p className="font-mono text-3xl text-silver font-semibold">{count}</p>
        <p className="font-mono text-xs text-steel tracking-widest uppercase mt-2">{label}</p>
      </Link>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    players: 0, tournaments: 0, results: 0,
    achievements: 0, earnings: 0, media: 0,
  });

  useEffect(() => {
    Promise.all([
      base44.entities.Player.list().then(d => ({ players: d.length })),
      base44.entities.Tournament.list().then(d => ({ tournaments: d.length })),
      base44.entities.Result.list().then(d => ({ results: d.length })),
      base44.entities.Achievement.list().then(d => ({ achievements: d.length })),
      base44.entities.Earning.list().then(d => ({ earnings: d.length })),
      base44.entities.Media.list().then(d => ({ media: d.length })),
    ]).then(results => {
      setCounts(Object.assign({}, ...results));
    }).catch(() => {});
  }, []);

  const stats = [
    { label: 'Players', count: counts.players, icon: Users, path: '/top-1website/players#author-adminbangladesh$top1', delay: 0 },
    { label: 'Tournaments', count: counts.tournaments, icon: Trophy, path: '/top-1website/tournaments#author-adminbangladesh$top1', delay: 0.05 },
    { label: 'Results', count: counts.results, icon: Medal, path: '/top-1website/results#author-adminbangladesh$top1', delay: 0.1 },
    { label: 'Achievements', count: counts.achievements, icon: Trophy, path: '/top-1website/achievements#author-adminbangladesh$top1', delay: 0.15 },
    { label: 'Earnings', count: counts.earnings, icon: DollarSign, path: '/top-1website/earnings#author-adminbangladesh$top1', delay: 0.2 },
    { label: 'Gallery Items', count: counts.media, icon: Image, path: '/top-1website/gallery#author-adminbangladesh$top1', delay: 0.25 },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-heading text-2xl font-semibold text-silver">Dashboard</h1>
        <p className="font-body text-muted-foreground text-sm mt-1">Manage all TOP-1 content from here.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="mt-10 micro-border bg-graphene p-6">
        <p className="font-mono text-xs text-steel tracking-ultra uppercase mb-4">Quick Actions</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Add Player', path: '/top-1website/players#author-adminbangladesh$top1' },
            { label: 'Add Tournament', path: '/top-1website/tournaments#author-adminbangladesh$top1' },
            { label: 'Upload Results', path: '/top-1website/results#author-adminbangladesh$top1' },
            { label: 'Add Achievement', path: '/top-1website/achievements#author-adminbangladesh$top1' },
            { label: 'Record Earning', path: '/top-1website/earnings#author-adminbangladesh$top1' },
            { label: 'Upload Media', path: '/top-1website/gallery#author-adminbangladesh$top1' },
          ].map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className="font-mono text-xs text-steel hover:text-silver border border-steel/20 hover:border-silver/30 px-4 py-2 transition-all min-h-0"
            >
              + {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}