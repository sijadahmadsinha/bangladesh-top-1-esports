import { base44 } from '@/api/base44Client';
import EntityManager from '../../components/admin/EntityManager';
import { formatDate } from '@/utils';

const FIELDS = [
  ['tournament_name', { type: 'string' }],
  ['placement', { type: 'string' }],
  ['date', { type: 'string', format: 'date' }],
  ['description', { type: 'string' }],
  ['banner_url', { type: 'string' }],
  ['result_image_url', { type: 'string' }],
  ['point_table_url', { type: 'string' }],
  ['mvp_image_url', { type: 'string' }],
];

export default function AdminResults() {
  return (
    <EntityManager
      entityName="Result"
      entity={base44.entities.Result}
      fields={FIELDS}
      title="Results"
      renderRow={(item) => (
        <div>
          <p className="font-heading text-sm text-silver">{item.tournament_name}</p>
          <div className="flex items-center gap-4 mt-0.5">
            {item.placement && <span className="font-mono text-xs text-tactical-green">{item.placement}</span>}
            {item.date && <span className="font-mono text-xs text-steel">{formatDate(item.date)}</span>}
          </div>
        </div>
      )}
    />
  );
}