import { base44 } from '@/api/base44Client';
import EntityManager from '../../components/admin/EntityManager';

const FIELDS = [
  ['ign', { type: 'string' }],
  ['real_name', { type: 'string' }],
  ['role', { type: 'string', enum: ['IGL', 'Rusher', 'Sniper', 'Support', 'Bomber', 'All-rounder', 'Coach', 'Manager'] }],
  ['country', { type: 'string' }],
  ['jersey_number', { type: 'string' }],
  ['uid', { type: 'string' }],
  ['matches_played', { type: 'number' }],
  ['kills', { type: 'number' }],
  ['booyahs', { type: 'number' }],
  ['earnings', { type: 'number' }],
  ['bio', { type: 'string' }],
  ['image_url', { type: 'string' }],
  ['facebook_url', { type: 'string' }],
  ['youtube_url', { type: 'string' }],
  ['tiktok_url', { type: 'string' }],
  ['instagram_url', { type: 'string' }],
  ['order', { type: 'number' }],
  ['is_active', { type: 'boolean' }],
];

export default function AdminPlayers() {
  return (
    <EntityManager
      entityName="Player"
      entity={base44.entities.Player}
      fields={FIELDS}
      title="Players"
      renderRow={(item) => (
        <div className="flex items-center gap-3">
          {item.image_url && <img src={item.image_url} alt="" className="w-10 h-12 object-cover opacity-90 micro-border" />}
          <div>
            <p className="font-heading text-sm text-silver">{item.ign}</p>
            <p className="font-mono text-[10px] text-steel tracking-ultra uppercase">{item.role} · {item.country}</p>
            <div className="flex gap-2 mt-1">
               <span className="font-mono text-[8px] text-steel">K: {item.kills || 0}</span>
               <span className="font-mono text-[8px] text-steel">B: {item.booyahs || 0}</span>
               <span className="font-mono text-[8px] text-tactical-yellow">${item.earnings || 0}</span>
            </div>
          </div>
          {!item.is_active && <span className="font-mono text-[10px] text-steel ml-auto opacity-50">[inactive]</span>}
        </div>
      )}
    />
  );
}