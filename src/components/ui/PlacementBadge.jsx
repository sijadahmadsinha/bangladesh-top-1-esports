export default function PlacementBadge({ placement }) {
  const isFirst = placement === '1st Place';
  const isSecond = placement === '2nd Place';
  const isThird = placement === '3rd Place';

  return (
    <span className={`font-mono text-xs px-2 py-1 border ${
      isFirst ? 'border-tactical-green/50 text-tactical-green bg-tactical-green/10' :
      isSecond ? 'border-silver/30 text-silver/70 bg-silver/5' :
      isThird ? 'border-amber-500/30 text-amber-500/70 bg-amber-500/5' :
      'border-steel/30 text-steel bg-steel/5'
    }`}>
      {placement}
    </span>
  );
}