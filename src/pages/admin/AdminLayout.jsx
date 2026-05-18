import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, Trophy, Medal, DollarSign,
  Image, ChevronRight, Menu, X, Shield
} from 'lucide-react';

const ADMIN_BASE = '/top-1website';
const ADMIN_HASH = '#author-adminbangladesh$top1';

const NAV = [
  { label: 'Dashboard', path: `${ADMIN_BASE}`, icon: LayoutDashboard },
  { label: 'Players', path: `${ADMIN_BASE}/players`, icon: Users },
  { label: 'Management', path: `${ADMIN_BASE}/management`, icon: Shield },
  { label: 'Tournaments', path: `${ADMIN_BASE}/tournaments`, icon: Trophy },
  { label: 'Results', path: `${ADMIN_BASE}/results`, icon: Medal },
  { label: 'Achievements', path: `${ADMIN_BASE}/achievements`, icon: Trophy },
  { label: 'Earnings', path: `${ADMIN_BASE}/earnings`, icon: DollarSign },
  { label: 'Gallery', path: `${ADMIN_BASE}/gallery`, icon: Image },
];

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Secret URL check
  if (location.hash !== ADMIN_HASH) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian text-steel font-mono text-xs tracking-widest">
        404 | NOT FOUND
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 micro-border-b">
        <Link to="/" className="block min-h-0">
          <img src="https://media.base44.com/images/public/6a06c41b0b0e28e4ac98d295/f2e92fb3c_logo.svg" alt="TOP-1 Esports" className="h-10 w-auto mb-1" />
          <p className="font-mono text-xs text-steel tracking-ultra uppercase mt-0.5">Admin Panel</p>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV.map(({ label, path, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={`${path}${ADMIN_HASH}`}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 font-heading text-sm transition-all min-h-0 ${
                active ? 'text-silver bg-silver/5 border border-silver/10' : 'text-steel hover:text-silver hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon size={16} />
              {label}
              {active && <ChevronRight size={14} className="ml-auto text-silver/50" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 micro-border-t">
        <Link to="/" className="flex items-center gap-2 font-mono text-xs text-steel hover:text-silver transition-colors min-h-0">
          ← Back to Site
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      <div className="site-bg" />
      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-60 flex-shrink-0 bg-graphene micro-border-r flex-col fixed top-0 bottom-0 left-0 z-30">
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <motion.div
          initial={{ x: -240 }}
          animate={{ x: 0 }}
          exit={{ x: -240 }}
          className="fixed top-0 left-0 bottom-0 w-60 bg-graphene micro-border-r z-40 flex flex-col lg:hidden"
        >
          <SidebarContent />
        </motion.div>
      )}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-60">
        {/* Top bar */}
        <div className="sticky top-0 z-20 glass-surface micro-border-b px-6 h-14 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-silver min-h-0 p-1">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <p className="font-mono text-xs text-steel tracking-ultra uppercase">
            {NAV.find(n => n.path === location.pathname)?.label || 'Admin'}
          </p>
        </div>

        <div className="p-6 lg:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}