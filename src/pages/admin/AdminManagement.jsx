import { base44 } from '@/api/base44Client';
import EntityManager from '../../components/admin/EntityManager';

const FIELDS = [
  ['name', { type: 'string' }],
  ['role', { type: 'string' }],
  ['bio', { type: 'string' }],
  ['image_url', { type: 'string' }],
  ['facebook_url', { type: 'string' }],
  ['discord_url', { type: 'string' }],
  ['youtube_url', { type: 'string' }],
  ['custom_url', { type: 'string' }],
  ['order', { type: 'number' }],
  ['is_active', { type: 'boolean' }],
];

export default function AdminManagement() {
  return (
    <EntityManager
      entityName="Management"
      entity={base44.entities.Management}
      fields={FIELDS}
      title="Management Team"
      renderRow={(item) => (
        <div className="flex items-center gap-3">
          {item.image_url && <img src={item.image_url} alt="" className="w-10 h-10 object-cover rounded-md opacity-80" />}
          <div>
            <p className="font-heading text-sm text-silver">{item.name}</p>
            <p className="font-mono text-[10px] text-steel tracking-ultra uppercase">{item.role}</p>
          </div>
          {!item.is_active && <span className="font-mono text-[10px] text-steel ml-auto opacity-50">[inactive]</span>}
        </div>
      )}
    />
  );
}
