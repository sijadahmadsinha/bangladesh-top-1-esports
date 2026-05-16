import { base44 } from '@/api/base44Client';
import EntityManager from '../../components/admin/EntityManager';
import PlacementBadge from '../../components/ui/PlacementBadge';

const FIELDS = [
  ['title', { type: 'string' }],
  ['tournament_name', { type: 'string' }],
  ['placement', { type: 'string', enum: ['1st Place', '2nd Place', '3rd Place', 'MVP', 'Top 5', 'Special Award'] }],
  ['prize_amount', { type: 'string' }],
  ['date', { type: 'string', format: 'date' }],
  ['description', { type: 'string' }],
  ['image_url', { type: 'string' }],
];

export default function AdminAchievements() {
  return (
    <EntityManager
      entityName="Achievement"
      entity={base44.entities.Achievement}
      fields={FIELDS}
      title="Achievements"
      renderRow={(item) => (
        <div className="flex items-center gap-3">
          <div>
            <p className="font-heading text-sm text-silver">{item.title}</p>
            <div className="flex items-center gap-3 mt-0.5">
              <p className="font-mono text-xs text-muted-foreground">{item.tournament_name}</p>
              {item.placement && <PlacementBadge placement={item.placement} />}
            </div>
          </div>
        </div>
      )}
    />
  );
}