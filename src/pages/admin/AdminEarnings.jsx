import { base44 } from '@/api/base44Client';
import EntityManager from '../../components/admin/EntityManager';
import { formatDate } from '@/utils';

const FIELDS = [
  ['tournament_name', { type: 'string' }],
  ['placement', { type: 'string' }],
  ['amount', { type: 'number' }],
  ['currency', { type: 'string' }],
  ['date', { type: 'string', format: 'date' }],
  ['banner_url', { type: 'string' }],
];

export default function AdminEarnings() {
  return (
    <EntityManager
      entityName="Earning"
      entity={base44.entities.Earning}
      fields={FIELDS}
      title="Earnings"
      renderRow={(item) => (
        <div className="flex items-center justify-between w-full pr-4">
          <div>
            <p className="font-heading text-sm text-silver">{item.tournament_name}</p>
            <p className="font-mono text-xs text-steel">{item.placement} · {formatDate(item.date)}</p>
          </div>
          <p className="font-mono text-sm text-silver font-semibold">${(item.amount || 0).toLocaleString('en-US')}</p>
        </div>
      )}
    />
  );
}