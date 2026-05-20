import { base44 } from '@/api/base44Client';
import EntityManager from '../../components/admin/EntityManager';

const sponsorFields = [
  ['name', { type: 'string' }],
  ['image_url', { type: 'string' }],
  ['order', { type: 'number' }],
  ['is_active', { type: 'boolean' }]
];

export default function AdminSponsors() {
  return (
    <EntityManager 
      entityName="Sponsor" 
      entity={base44.entities.Sponsor}
      fields={sponsorFields} 
      title="Sponsor Management" 
      renderRow={(item) => (
        <div className="flex items-center gap-3">
          {item.image_url && <img src={item.image_url} alt="" className="w-16 h-8 object-contain rounded-sm opacity-80" />}
          <div>
            <p className="font-heading text-sm text-silver">{item.name}</p>
          </div>
          {!item.is_active && <span className="font-mono text-[10px] text-steel ml-auto opacity-50">[inactive]</span>}
        </div>
      )}
    />
  );
}
