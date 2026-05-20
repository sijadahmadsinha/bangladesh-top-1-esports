import { base44 } from '@/api/base44Client';
import EntityManager from '../../components/admin/EntityManager';
import StatusBadge from '../../components/ui/StatusBadge';
import { formatDate } from '@/utils';

const FIELDS = [
  ['name', { type: 'string' }],
  ['organizer', { type: 'string' }],
  ['type', { type: 'string', enum: ['Official', 'Unofficial'] }],
  ['status', { type: 'string', enum: ['Upcoming', 'Live', 'Finished'] }],
  ['date', { type: 'string', format: 'date' }],
  ['time', { type: 'string' }],
  ['prize_pool', { type: 'string' }],
  ['placement', { type: 'string' }],
  ['description', { type: 'string' }],
  ['banner_url', { type: 'string' }],
  ['youtube_link', { type: 'string' }],
];

export default function AdminTournaments() {
  return (
    <EntityManager
      entityName="Tournament"
      entity={base44.entities.Tournament}
      fields={FIELDS}
      title="Tournaments"
      renderRow={(item) => (
        <div className="flex items-center gap-3">
          <div>
            <p className="font-heading text-sm text-silver">{item.name}</p>
            <div className="flex items-center gap-4 mt-0.5">
              <span className="font-mono text-xs text-steel">{item.type}</span>
              <StatusBadge status={item.status} />
              {item.date && <span className="font-mono text-xs text-steel">{formatDate(item.date)}</span>}
            </div>
          </div>
        </div>
      )}
    />
  );
}