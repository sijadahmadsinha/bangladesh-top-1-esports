import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import SectionHeader from '../components/ui/SectionHeader';
import LoadingScreen from '../components/ui/LoadingScreen';
import { X, ZoomIn, Play } from 'lucide-react';
import { getEmbedUrl, optimizeImageUrl } from '@/utils';

function MediaPreview({ item, onClose }) {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.92 }}
        className="max-w-5xl w-full"
        onClick={e => e.stopPropagation()}
      >
        {item.type === 'video' ? (
          <div className="aspect-video">
            <iframe src={getEmbedUrl(item.url)} className="w-full h-full" allowFullScreen title={item.title} />
          </div>
        ) : (
          <img src={optimizeImageUrl(item.url)} alt={item.title} className="max-w-full max-h-[85vh] object-contain mx-auto" />
        )}
        {item.title && (
          <p className="font-heading text-silver text-center mt-4">{item.title}</p>
        )}
      </motion.div>
      <button onClick={onClose} className="absolute top-6 right-6 text-silver p-2 micro-border bg-graphene min-h-0">
        <X size={20} />
      </button>
    </motion.div>
  );
}

function MediaItem({ item, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className={`relative overflow-hidden micro-border bg-graphene group cursor-pointer ${
        index % 7 === 0 || index % 7 === 4 ? 'row-span-2' : ''
      }`}
      style={{ aspectRatio: index % 7 === 0 || index % 7 === 4 ? undefined : '16/9' }}
      onClick={onClick}
      data-cursor-expand
    >
      <img
        src={optimizeImageUrl(item.thumbnail_url || item.url)}
        alt={item.title || ''}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        {item.type === 'video' ? (
          <Play size={32} className="text-white" />
        ) : (
          <ZoomIn size={24} className="text-white" />
        )}
      </div>
      {item.category && (
        <span className="absolute top-3 left-3 font-mono text-xs text-silver/60 opacity-0 group-hover:opacity-100 transition-opacity">
          {item.category}
        </span>
      )}
    </motion.div>
  );
}

export default function Gallery() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    base44.entities.Media.list('-date').then(setMedia).finally(() => setLoading(false));
  }, []);

  const categories = ['All', 'Team Photo', 'Tournament', 'Match Highlight', 'Behind the Scenes'];
  const filtered = filter === 'All' ? media : media.filter(m => m.category === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-40 pb-15 lg:pb-32">
        <SectionHeader
          label="Visual Archive"
          title="Gallery"
          subtitle="Captured moments from tournaments, team sessions, and behind the scenes."
        />

        {/* Filter */}
        <div className="flex flex-wrap gap-1 mb-10">
          {categories.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs px-3 py-2 tracking-widest uppercase transition-all min-h-0 border ${
                filter === f ? 'border-silver/30 text-white bg-silver/5' : 'border-transparent text-red-600 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? <LoadingScreen /> : (
          filtered.length === 0 ? (
            <div className="text-center py-15">
              <p className="font-mono text-xs text-steel tracking-ultra uppercase">No media uploaded yet</p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {filtered.map((item, i) => (
                <div key={item.id} className="break-inside-avoid mb-3">
                  <MediaItem item={item} index={i} onClick={() => setSelected(item)} />
                </div>
              ))}
            </div>
          )
        )}
      </div>

      <AnimatePresence>
        {selected && <MediaPreview item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}