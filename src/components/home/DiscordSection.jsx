import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function DiscordSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-16 py-15 micro-border-t">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="micro-border bg-graphene p-10 md:p-16 relative overflow-hidden"
      >
        {/* BG text */}
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold text-silver/[0.025] pointer-events-none select-none"
          style={{ fontSize: 'clamp(80px, 15vw, 200px)' }}
        >
          DISCORD
        </span>

        <div className="relative z-10 max-w-2xl">
          <p className="font-mono text-xs text-steel tracking-ultra uppercase mb-4">Community</p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-silver mb-4">
            Join Our Discord Server
          </h2>
          <p className="font-body text-muted-foreground text-lg mb-8 leading-relaxed">
            Connect with TOP-1 fans, get tournament notifications, watch live matches together, and become part of Bangladesh's most competitive Free Fire community.
          </p>
          <a
            href="https://discord.gg/top1esports"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-silver text-obsidian px-6 py-3 font-heading font-semibold text-sm tracking-widest uppercase hover:bg-silver/90 transition-all group min-h-0"
          >
            Join Discord
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}