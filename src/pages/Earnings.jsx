import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import SectionHeader from '../components/ui/SectionHeader';
import LoadingScreen from '../components/ui/LoadingScreen';
import { formatDate } from '@/utils';

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2200;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return <span ref={ref}>{display.toLocaleString('en-US')}</span>;
}

export default function Earnings() {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Earning.list('-date').then(setEarnings).finally(() => setLoading(false));
  }, []);

  const total = earnings.reduce((s, e) => s + (e.amount || 0), 0);
  const tournamentCount = earnings.length;
  const avgPrize = tournamentCount ? Math.round(total / tournamentCount) : 0;
  const topPrize = Math.max(...earnings.map(e => e.amount || 0), 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-40 pb-15 lg:pb-32">
        <SectionHeader
          label="Prize History"
          title="Earnings"
          subtitle="Financial proof of competitive dominance. Every USD earned through skill and strategy."
        />

        {loading ? <LoadingScreen /> : (
          <>
            {/* Hero total */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="micro-border bg-graphene p-6 md:p-10 mb-8 relative overflow-hidden"
            >
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold text-silver/[0.025] pointer-events-none select-none"
                style={{ fontSize: 'clamp(80px, 15vw, 220px)' }}
              >
                PRIZE
              </span>
              <div className="relative z-10">
                <p className="font-mono text-xs text-steel tracking-ultra uppercase mb-4">Total Prize Earnings</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="font-mono text-silver text-3xl md:text-4xl">$</span>
                  <span
                    className="font-mono text-silver font-bold earnings-counter"
                    style={{ fontSize: 'clamp(56px, 10vw, 120px)' }}
                  >
                    <AnimatedNumber value={total} />
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 pt-8 border-t border-silver/5">
                  <div>
                    <p className="font-mono text-2xl text-silver font-semibold">{tournamentCount}</p>
                    <p className="font-mono text-xs text-steel tracking-widest uppercase mt-1">Tournaments</p>
                  </div>
                  <div>
                    <p className="font-mono text-2xl text-silver font-semibold">$<AnimatedNumber value={avgPrize} /></p>
                    <p className="font-mono text-xs text-steel tracking-widest uppercase mt-1">Average Prize</p>
                  </div>
                  <div>
                    <p className="font-mono text-2xl text-silver font-semibold">$<AnimatedNumber value={topPrize} /></p>
                    <p className="font-mono text-xs text-steel tracking-widest uppercase mt-1">Top Prize</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            {earnings.length === 0 ? (
              <div className="text-center py-15">
                <p className="font-mono text-xs text-steel tracking-ultra uppercase">No earnings recorded yet</p>
              </div>
            ) : (
              <div>
                <p className="font-mono text-xs text-steel tracking-ultra uppercase mb-6">Prize Breakdown</p>
                <div className="space-y-px">
                  {earnings.map((e, i) => (
                    <motion.div
                      key={e.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-graphene micro-border group hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-steel/40 w-6 text-right flex-shrink-0">
                          {(i + 1).toString().padStart(2, '0')}
                        </span>
                        {e.banner_url && (
                          <img src={e.banner_url} alt="" className="w-10 h-10 object-cover opacity-80" loading="lazy" />
                        )}
                        <div>
                          <p className="font-heading font-semibold text-silver">{e.tournament_name}</p>
                          <div className="flex items-center gap-4 mt-1">
                            {e.placement && <span className="font-mono text-xs text-muted-foreground">{e.placement}</span>}
                            {e.date && <span className="font-mono text-xs text-steel">{formatDate(e.date)}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-3 sm:mt-0">
                        <span className="font-mono text-xs text-steel">{e.currency || 'USD'}</span>
                        <span className="font-mono text-xl text-silver font-semibold">
                          ${(e.amount || 0).toLocaleString('en-US')}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Total footer */}
                <div className="flex items-center justify-between p-5 bg-silver/5 micro-border mt-px">
                  <span className="font-mono text-xs text-steel tracking-ultra uppercase">Total</span>
                  <span className="font-mono text-xl text-silver font-semibold">${total.toLocaleString('en-US')}</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}