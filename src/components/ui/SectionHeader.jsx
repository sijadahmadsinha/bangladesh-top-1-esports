import { motion } from 'framer-motion';

export default function SectionHeader({ label, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16"
    >
      {label && (
        <p className="font-mono text-xs text-steel tracking-ultra uppercase mb-4">{label}</p>
      )}
      <h2 className="font-heading text-3xl md:text-5xl font-semibold text-silver leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-muted-foreground mt-4 text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="w-12 h-px bg-silver/30 mt-6" />
    </motion.div>
  );
}