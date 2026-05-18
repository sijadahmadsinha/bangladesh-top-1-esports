import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Hero background image */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <img
          src="src\assets\banner.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.35) saturate(0.6)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian" />
      </motion.div>
      {/* Watermark number */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span
          className="font-display font-bold select-none"
          style={{
            fontSize: 'clamp(200px, 40vw, 600px)',
            color: 'rgba(255, 0, 0, 0.02)',
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}
        >
          01
        </span>
      </motion.div>

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-silver/10 to-transparent" />

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 pt-15 pb-10 w-full flex flex-col items-center md:items-start"
      >
        {/* Meta tag */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-mono text-xs text-steel tracking-ultra uppercase mb-8 flex items-center justify-center md:justify-start gap-3 w-full md:w-auto"
        >
          <span className="w-8 h-px bg-steel/50" />
          Bangladesh Top 1 Esports Official
        </motion.p>
 
        {/* Main heading */}
        <div className="overflow-hidden mb-4 w-full text-center md:text-left">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-silver leading-[0.9]"
            style={{ fontSize: 'clamp(22px, 10vw, 160px)', letterSpacing: '-0.02em' }}
          >
            BNGLADSH<br className="md:hidden" /> TOP-1
          </motion.h1>
        </div>
 
        {/* Subtitle */}
        <div className="overflow-hidden mb-10 w-full text-center md:text-left">
          <motion.p
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto md:mx-0"
          >
            Domination is not a goal. It is a standard.
          </motion.p>
        </div>
 
        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-4"
        >
          <Link
            to="/team"
            className="flex items-center gap-3 bg-red-600 text-white px-6 py-3 font-heading font-semibold text-sm tracking-widest uppercase hover:bg-red-700 transition-all duration-300 group min-h-0 rounded-none"
          >
            Meet The Team
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/community"
            className="flex items-center gap-3 border border-red-600/60 text-silver px-6 py-3 font-heading text-sm tracking-widest uppercase hover:border-red-500 hover:text-red-400 transition-all duration-300 min-h-0 rounded-none"
          >
            Join Community
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-20 pt-8 micro-border-t grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {[
            { value: '200+', label: 'Tournaments' },
            { value: '৳10.5L+', label: 'Prize' },
            { value: '5+', label: 'Team Members' },
            { value: '2023', label: 'Founded' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-mono text-2xl text-silver font-semibold mb-1">{value}</p>
              <p className="font-body text-xs text-steel tracking-widest uppercase">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-silver/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}