import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import SectionHeader from '../components/ui/SectionHeader';
import LoadingScreen from '../components/ui/LoadingScreen';
import { X, ZoomIn } from 'lucide-react';
import { formatDate } from '@/utils';

function ImagePreview({ src, alt, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 backdrop-blur-lg p-4"
      onClick={onClose}
    >
      <motion.img
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain"
        onClick={e => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-silver hover:text-white p-2 micro-border bg-graphene min-h-0"
        aria-label="Close"
      >
        <X size={20} />
      </button>
    </motion.div>
  );
}

function ImageThumb({ src, label }) {
  const [preview, setPreview] = useState(null);

  return (
    <>
      <button
        onClick={() => setPreview(src)}
        className="relative group aspect-video overflow-hidden bg-graphene micro-border min-h-0 w-full"
        data-cursor-expand
      >
        <img src={src} alt={label} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
          <ZoomIn size={24} className="text-white" />
        </div>
        <span className="absolute bottom-2 left-2 font-mono text-xs text-silver/70">{label}</span>
      </button>
      <AnimatePresence>
        {preview && <ImagePreview src={preview} alt={label} onClose={() => setPreview(null)} />}
      </AnimatePresence>
    </>
  );
}

function ResultCard({ result, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.7 }}
      className="micro-border bg-graphene overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 border-b border-silver/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {result.banner_url && (
            <img src={result.banner_url} alt="" className="w-10 h-10 object-cover opacity-80" loading="lazy" />
          )}
          <div>
            <p className="font-heading font-semibold text-silver">{result.tournament_name}</p>
            <div className="flex items-center gap-4 mt-1">
              {result.placement && <span className="font-mono text-xs text-tactical-green">{result.placement}</span>}
              {result.date && <span className="font-mono text-xs text-steel">{formatDate(result.date)}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {result.result_image_url && <ImageThumb src={result.result_image_url} label="Result" />}
          {result.point_table_url && <ImageThumb src={result.point_table_url} label="Points" />}
          {result.mvp_image_url && <ImageThumb src={result.mvp_image_url} label="MVP" />}
        </div>
        {result.description && (
          <p className="font-body text-sm text-muted-foreground mt-4">{result.description}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Result.list('-date').then(setResults).finally(() => setLoading(false));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-40 pb-15 lg:pb-32">
        <SectionHeader
          label="Match History"
          title="Tournament Results"
          subtitle="Point tables, result snapshots, and MVP highlights from our competitive history."
        />

        {loading ? <LoadingScreen /> : (
          results.length === 0 ? (
            <div className="text-center py-15">
              <p className="font-mono text-xs text-steel tracking-ultra uppercase">No results uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((r, i) => <ResultCard key={r.id} result={r} index={i} />)}
            </div>
          )
        )}
      </div>
    </motion.div>
  );
}