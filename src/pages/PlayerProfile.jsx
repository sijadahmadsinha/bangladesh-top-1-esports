import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import LoadingScreen from '../components/ui/LoadingScreen';
import SocialIcon from '../components/ui/SocialIcon';
import { formatDate } from '@/utils';
import { 
  Trophy, 
  Target, 
  Swords, 
  Award,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Gamepad2,
  Share2,
  Calendar
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, colorClass = "text-silver", delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="bg-obsidian/40 backdrop-blur-md micro-border p-6 group hover:border-silver/30 transition-all duration-500 relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-white/10 transition-colors" />
    <div className="flex items-start justify-between mb-6 relative z-10">
      <div className="p-3 bg-white/5 rounded-xl text-steel group-hover:text-silver group-hover:scale-110 transition-all">
        <Icon size={20} />
      </div>
    </div>
    <div className="relative z-10">
      <p className="font-mono text-[10px] text-steel tracking-[0.2em] uppercase mb-1.5">{label}</p>
      <h4 className={`font-heading text-3xl font-bold tracking-tight ${colorClass}`}>{value}</h4>
    </div>
  </motion.div>
);

export default function PlayerProfile() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    base44.entities.Player.getById(id)
      .then(setPlayer)
      .catch(err => console.error('Player fetch error:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingScreen />;

  if (!player) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
          <Gamepad2 size={32} className="text-steel" />
        </div>
        <h2 className="font-heading text-4xl font-bold text-silver mb-4 tracking-tight">Access Denied</h2>
        <p className="text-steel font-body mb-10 max-w-md">The player file you're looking for doesn't exist or has been relocated from our database.</p>
        <Link to="/team" className="font-mono text-[10px] text-obsidian bg-silver tracking-widest uppercase px-10 py-4 hover:bg-white transition-all">
          Back to Roster
        </Link>
      </div>
    );
  }

  const kdRatio = player.matches_played > 0 ? (player.kills / player.matches_played).toFixed(2) : '0.00';

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="relative min-h-screen"
    >
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-obsidian" />
        {player.image_url && (
          <div 
            className="absolute inset-0 opacity-[0.03] blur-3xl scale-110"
            style={{ 
              backgroundImage: `url(${player.image_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
      </div>

      <div className="relative z-10 pt-20 pb-15 px-6 lg:px-16 max-w-[1500px] mx-auto">
        {/* Breadcrumb */}
        <Link to="/team" className="inline-flex items-center gap-3 font-mono text-[10px] text-steel hover:text-silver tracking-[0.2em] uppercase mb-16 transition-all group">
          <div className="w-8 h-px bg-steel/30 group-hover:w-12 group-hover:bg-silver transition-all" />
          <ArrowLeft size={12} /> The Roster's
        </Link>

        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Portrait Container */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            <div className="aspect-[4/5] relative overflow-hidden micro-border bg-graphene shadow-2xl">
              {player.image_url ? (
                <img 
                  src={player.image_url} 
                  alt={player.ign} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-graphene to-obsidian flex items-center justify-center">
                  <span className="font-display text-[15rem] font-bold text-silver/5 select-none">{player.ign?.[0]}</span>
                </div>
              )}
              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 border-[20px] border-obsidian/10 pointer-events-none" />
            </div>
            
            {/* Jersey Badge Overlay */}

          </motion.div>

          {/* Identity Container */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 pt-8"
          >
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="px-4 py-1.5 bg-silver text-obsidian font-mono text-[10px] font-bold tracking-widest uppercase">
                {player.role}
              </span>
            </div>
            
            <h1 className="font-heading text-7xl md:text-9xl font-extrabold text-silver mb-6 tracking-tight leading-none">
              {player.ign}
            </h1>
            
            <p className="font-heading text-2xl text-steel/60 mb-10 max-w-2xl leading-snug">
              {player.real_name || 'Classified Identity'}
            </p>

            <div className="flex flex-wrap items-center gap-8 mb-12">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] tracking-ultra uppercase text-steel mb-2">Team Entity</span>
                <span className="font-heading text-xl text-silver">TOP-1 ESPORTS</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="font-mono text-[10px] tracking-ultra uppercase text-steel mb-2">Contract Status</span>
                <span className="font-mono text-xs text-tactical-green flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-tactical-green animate-pulse" /> ACTIVE
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              {[
                { name: 'Facebook', url: player.facebook_url },
                { name: 'YouTube', url: player.youtube_url },
                { name: 'TikTok', url: player.tiktok_url },
              ].map((social, i) => social.url && (
                <a 
                  key={i}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-4 bg-white/5 hover:bg-silver hover:text-obsidian micro-border transition-all duration-300 flex items-center justify-center min-h-0"
                >
                  <SocialIcon platform={social.name} size={20} />
                </a>
              ))}
              <button className="p-4 bg-white/5 hover:bg-white/10 micro-border text-steel transition-all flex items-center justify-center min-h-0">
                <Share2 size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-15">
            
            {/* Stats Grid */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="font-heading text-xs font-bold text-silver tracking-[0.3em] uppercase">Combat Performance</h2>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard icon={Target} label="Total Kills" value={player.kills?.toLocaleString()} delay={0.1} />
                <StatCard icon={Swords} label="Matches Played" value={player.matches_played?.toLocaleString()} delay={0.2} />
                <StatCard icon={Trophy} label="Booyahs" value={player.booyahs?.toLocaleString()} colorClass="text-tactical-green" delay={0.3} />
                <StatCard icon={TrendingUp} label="K/D Precision" value={kdRatio} colorClass="text-tactical-yellow" delay={0.4} />
              </div>
              {player.uid && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-6 p-6 bg-obsidian/40 micro-border flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg text-steel"><Gamepad2 size={16} /></div>
                    <span className="font-mono text-[10px] text-steel tracking-ultra uppercase">Network UID</span>
                  </div>
                  <span className="font-mono text-sm text-silver font-bold tracking-widest bg-white/5 px-4 py-2 rounded select-all cursor-copy">
                    {player.uid}
                  </span>
                </motion.div>
              )}
            </section>

            {/* Biography */}
            {player.bio && (
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="font-heading text-xs font-bold text-silver tracking-[0.3em] uppercase">Player Brief</h2>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <div className="relative p-12 bg-graphene/30 micro-border overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-silver/20" />
                  <p className="font-body text-silver/80 leading-relaxed text-xl font-light italic relative z-10">
                    "{player.bio}"
                  </p>
                  <Award className="absolute -bottom-8 -right-8 w-40 h-40 text-white/5 -rotate-12" />
                </div>
              </section>
            )}

            {/* Achievements Timeline */}
            {player.achievements?.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="font-heading text-xs font-bold text-silver tracking-[0.3em] uppercase">Hall of Fame</h2>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <div className="space-y-6">
                  {player.achievements.map((ach, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group p-8 bg-obsidian/40 backdrop-blur-sm micro-border hover:border-silver/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="flex items-start gap-5">
                        <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-tactical-yellow border border-tactical-yellow/20">
                          <Trophy size={24} />
                        </div>
                        <div>
                          <h4 className="font-heading text-xl text-silver group-hover:text-white transition-colors">{ach.title}</h4>
                          <div className="flex items-center gap-3 mt-2">
                             <span className="font-mono text-[9px] text-steel tracking-widest uppercase">{ach.event}</span>
                             {ach.date && (
                               <div className="flex items-center gap-1.5 font-mono text-[9px] text-steel/60">
                                 <Calendar size={10} /> {formatDate(ach.date)}
                               </div>
                             )}
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-block px-6 py-2 bg-silver text-obsidian font-heading text-sm font-black tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                          {ach.placement}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Earnings Showcase */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-12 bg-obsidian micro-border border-tactical-yellow/30 text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-tactical-yellow/5 to-transparent pointer-events-none" />
              <div className="w-20 h-20 bg-tactical-yellow/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-tactical-yellow/20">
                <DollarSign size={36} className="text-tactical-yellow" />
              </div>
              <p className="font-mono text-[10px] text-tactical-yellow tracking-[0.4em] uppercase mb-3">Total Career Earnings</p>
              <h3 className="font-heading text-6xl font-black text-silver mb-2 tracking-tighter">
                ${player.earnings?.toLocaleString() || '0'}
              </h3>
              <p className="font-mono text-[9px] text-steel/50 uppercase tracking-widest">Verified by TOP-1 ESports</p>
            </motion.section>



          </div>
        </div>
      </div>
    </motion.div>
  );
}
