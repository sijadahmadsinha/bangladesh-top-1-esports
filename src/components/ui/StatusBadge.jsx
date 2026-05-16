export default function StatusBadge({ status }) {
  const config = {
    Live: { dot: 'bg-red-500 live-dot', text: 'text-red-500', label: 'LIVE' },
    Upcoming: { dot: 'bg-silver/60', text: 'text-silver/60', label: 'UPCOMING' },
    Finished: { dot: 'bg-steel', text: 'text-steel', label: 'FINISHED' },
  };

  const c = config[status] || config.Upcoming;

  return (
    <span className="flex items-center gap-2">
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      <span className={`font-mono text-xs tracking-ultra ${c.text}`}>{c.label}</span>
    </span>
  );
}