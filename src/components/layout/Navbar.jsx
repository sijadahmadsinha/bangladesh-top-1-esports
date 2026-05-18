import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import logoImg from '@/assets/logo.svg';

const NAV_LINKS = [
  { label: "Home", path: '/' },
  { label: "Roster's", path: '/team' },
  { 
    label: 'Tournaments', 
    path: '#',
    submenu: [
      { label: 'Official', path: '/official-tournaments' },
      { label: 'Unofficial', path: '/unofficial-tournaments' },
    ]
  },
  { label: 'Results', path: '/results' },
  { label: "Achievement's", path: '/achievements' },
  { label: 'Earnings', path: '/earnings' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Community', path: '/community' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="!fixed top-0 left-0 w-full !z-[9999] lg:bg-transparent bg-gradient-to-b from-obsidian/90 via-obsidian/45 to-transparent lg:backdrop-blur-none backdrop-blur-md pb-4"
      >
        {/* Logo row */}
        <div className="flex justify-center pt-3 pb-1">
          <Link to="/" className="min-h-0">
            <img
              src={logoImg}
              alt="TOP-1 Esports"
              className="h-16 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex justify-center pb-3">
          <ul className={`flex items-center justify-center gap-0 backdrop-blur-xl border rounded-none px-4 py-1 transition-all duration-500 ${
            scrolled 
              ? 'bg-red-600 border-red-700' 
              : 'bg-obsidian/40 border-white/5 shadow-lg'
          }`}>
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              if (link.submenu) {
                return (
                  <li key={link.label} className="relative group">
                    <button
                      className={`px-5 py-3 font-poppins font-light text-[11px] tracking-[0.15em] uppercase transition-all duration-300 flex items-center gap-1 min-h-0 ${
                        scrolled ? 'text-white hover:text-white/80' : 'text-silver/80 group-hover:text-red-600'
                      }`}
                    >
                      {link.label} <ChevronDown size={12} className="transition-transform group-hover:rotate-180" />
                    </button>
                    {/* Dropdown ul */}
                    <ul className="absolute top-full left-0 w-48 bg-obsidian/90 backdrop-blur-xl border border-white/5 rounded-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-2 group-hover:bg-red-600">
                      {link.submenu.map((sub) => (
                        <li key={sub.path}>
                          <Link
                            to={sub.path}
                            className="block px-6 py-2 text-[10px] tracking-widest uppercase text-silver/80 group-hover:text-white hover:!text-white transition-colors"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`px-5 py-3 font-poppins font-light text-[11px] tracking-[0.15em] uppercase transition-all duration-300 rounded-none !min-h-0 flex items-center justify-center ${
                      scrolled
                        ? (isActive ? 'text-white font-bold underline underline-offset-4' : 'text-white/90 hover:text-white')
                        : (isActive ? 'text-red-600 font-medium' : 'text-silver/80 hover:text-red-600')
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden absolute top-4 right-6">
          <button
            onClick={() => setOpen(!open)}
            className="bg-red-600 text-white p-2 rounded-none min-h-0"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="!fixed inset-0 !z-[10000] bg-obsidian/95 backdrop-blur-lg flex flex-col items-center justify-center gap-2 px-8 overflow-y-auto"
          >
            <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-white min-h-0">
              <X size={24} />
            </button>
            <div className="flex flex-col items-center gap-2 py-20 w-full">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full max-w-xs"
                >
                  {link.submenu ? (
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-silver/40 text-[10px] uppercase tracking-widest mb-1">{link.label}</span>
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className={`w-full block text-center py-2 font-heading text-sm tracking-widest uppercase transition-colors ${
                            location.pathname === sub.path
                              ? 'text-red-600'
                              : 'text-silver hover:text-red-600'
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block text-center py-3 font-heading text-base tracking-widest uppercase rounded-none transition-colors ${
                        location.pathname === link.path
                          ? 'bg-red-600 text-white'
                          : 'text-silver hover:text-white hover:bg-red-600/20'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}