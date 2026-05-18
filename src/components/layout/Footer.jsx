import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 micro-border-t mt-20 bg-obsidian/60 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <img src="https://media.base44.com/images/public/6a06c41b0b0e28e4ac98d295/f2e92fb3c_logo.svg" alt="TOP-1 Esports" className="h-12 w-auto mb-3" />
            <p className="font-mono text-steel text-xs tracking-ultra uppercase mb-4">Bangladesh TOP 1 Esport Official</p>
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              Dominating the competitive Free Fire scene with precision, strategy, and relentless dedication.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-mono text-xs text-steel tracking-ultra uppercase mb-6">Navigation</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['Home', '/'], ['Team', '/team'], ['Official', '/official-tournaments'],
                ['Unofficial', '/unofficial-tournaments'], ['Results', '/results'],
                ['Achievements', '/achievements'], ['Earnings', '/earnings'],
                ['Gallery', '/gallery'], ['Community', '/community'],
              ].map(([label, path]) => (
                <Link key={path} to={path} className="font-body text-sm text-steel hover:text-silver transition-colors duration-200 min-h-0 py-1">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="font-mono text-xs text-steel tracking-ultra uppercase mb-6">Follow Us</p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Discord', url: '#', handle: 'Upcoming...' },
                { label: 'YouTube', url: 'https://youtube.com/@raadvaiesports?si=xI5DSFtjiElxI7q_', handle: '@raadvaiesports' },
                { label: 'Facebook Page', url: 'https://www.facebook.com/profile.php?id=61583270264416', handle: 'Bangladesh Top.1' },
                { label: 'Facebook Group', url: 'https://www.facebook.com/groups/1139101504644099/', handle: 'Community Group' },
                { label: 'TikTok', url: 'https://www.tiktok.com/@raadvaiyt.bdtop1', handle: '@raadvaiyt.bdtop1' }
              ].map(({ label, url, handle }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between group min-h-0 py-1">
                  <span className="font-body text-sm text-muted-foreground group-hover:text-silver transition-colors">{label}</span>
                  <span className="font-mono text-xs text-steel group-hover:text-silver transition-colors">{handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="micro-border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-steel">© {year} TOP-1 Esports. All rights reserved.</p>
          <p className="font-mono text-xs text-steel/50">Meet with developer <a href="https://sijadahmad98.netlify.app">click here</a> </p>
        </div>
      </div>
    </footer>
  );
}