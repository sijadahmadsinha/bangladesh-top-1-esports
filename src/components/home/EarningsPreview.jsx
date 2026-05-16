import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';

function Counter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString('en-BD')}</span>;
}

export default function EarningsPreview() {
  const [earnings, setEarnings] = useState([]);
  const total = earnings.reduce((s, e) => s + (e.amount || 0), 0);

  useEffect(() => {
    base44.entities.Earning.list('-date', 50).then(setEarnings).catch(() => {});
  }, []);

  if (!earnings.length) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-16 py-15 micro-border-t">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: Big number */}
        <div>
          <p className="font-mono text-xs text-steel tracking-ultra uppercase mb-6">Total Prize Earnings</p>
          <div className="mb-3">
            <span className="font-mono text-steel text-2xl">৳</span>
            <span
              className="font-mono text-silver font-bold"
              style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
            >
              <Counter target={total} />
            </span>
          </div>
          <p className="font-body text-muted-foreground text-sm">{earnings.length} tournament{earnings.length !== 1 ? 's' : ''} · All time earnings</p>
          <Link to="/earnings" className="inline-flex items-center gap-2 font-mono text-xs text-steel hover:text-silver tracking-ultra uppercase transition-colors mt-6 min-h-0">
            Detailed Breakdown →
          </Link>
        </div>

        {/* Right: Recent entries */}
        <div className="space-y-px">
          {earnings.slice(0, 5).map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center justify-between p-4 bg-graphene micro-border"
            >
              <div>
                <p className="font-heading text-sm text-silver">{e.tournament_name}</p>
                {e.placement && <p className="font-mono text-xs text-steel mt-0.5">{e.placement}</p>}
              </div>
              <p className="font-mono text-silver font-semibold">৳{e.amount?.toLocaleString('en-BD')}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}