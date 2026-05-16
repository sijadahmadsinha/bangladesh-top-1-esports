import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-8 h-8 border border-silver/20 border-t-silver/80 rounded-full animate-spin" />
        <p className="font-mono text-xs text-steel tracking-ultra">LOADING</p>
      </motion.div>
    </div>
  );
}