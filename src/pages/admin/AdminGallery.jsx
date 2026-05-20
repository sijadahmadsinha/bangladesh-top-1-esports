import { base44 } from '@/api/base44Client';
import EntityManager from '../../components/admin/EntityManager';
import { formatDate } from '@/utils';

const FIELDS = [
  ['title', { type: 'string' }],
  ['type', { type: 'string', enum: ['photo', 'video', 'screenshot'] }],
  ['category', { type: 'string', enum: ['Team Photo', 'Tournament', 'Match Highlight', 'Behind the Scenes'] }],
  ['url', { type: 'string' }],
  ['thumbnail_url', { type: 'string' }],
  ['date', { type: 'string', format: 'date' }],
];

export default function AdminGallery() {
  return (
    <EntityManager
      entityName="Media"
      entity={base44.entities.Media}
      fields={FIELDS}
      title="Gallery"
      renderRow={(item) => (
        <div className="flex items-center gap-3">
          {(item.thumbnail_url || item.url) && (
            <img src={item.thumbnail_url || item.url} alt="" className="w-10 h-10 object-cover opacity-90" />
          )}
          <div>
            <p className="font-heading text-sm text-silver">{item.title || 'Untitled'}</p>
            <p className="font-mono text-xs text-steel">{item.type} · {item.category}{item.date ? ` · ${formatDate(item.date)}` : ''}</p>
          </div>
        </div>
      )}
    />
  );
}