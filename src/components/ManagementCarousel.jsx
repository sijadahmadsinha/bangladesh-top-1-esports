import { useEffect, useState, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { ExternalLink } from 'lucide-react';
import SocialIcon from './ui/SocialIcon';

const ManagementCard = ({ member }) => (
  <div className="w-[300px] flex-shrink-0 group">
    <div className="bg-graphene/40 backdrop-blur-sm micro-border p-8 hover:border-silver/30 transition-all duration-500 group-hover:-translate-y-2 relative overflow-hidden h-full flex flex-col">
      {/* Red accent glow on hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/0 to-transparent group-hover:via-red-600/50 transition-all duration-700" />
      
      {/* Image Container */}
      <div className="relative mb-8 aspect-square w-32 mx-auto">
        <div className="absolute inset-0 bg-red-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/5 group-hover:border-red-600/30 transition-colors duration-500 shadow-2xl">
          {member.image_url ? (
            <img 
              src={member.image_url} 
              alt={member.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-obsidian flex items-center justify-center">
              <span className="font-display text-4xl text-silver/10">{member.name?.[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="text-center flex-1 flex flex-col">
        <h3 className="font-heading text-xl font-bold text-silver mb-1 group-hover:text-white transition-colors">
          {member.name}
        </h3>
        <p className="font-mono text-[10px] text-red-600 tracking-[0.3em] uppercase mb-4">
          {member.role}
        </p>
        {member.bio && (
          <p className="font-body text-xs text-steel leading-relaxed mb-6 italic opacity-80">
            "{member.bio}"
          </p>
        )}

        {/* Socials */}
        <div className="flex items-center justify-center gap-3 mt-auto pt-6 border-t border-white/5">
          {member.facebook_url && (
            <a href={member.facebook_url} target="_blank" rel="noopener noreferrer" className="p-2 text-steel hover:text-red-600 transition-colors flex items-center justify-center min-h-0">
              <SocialIcon platform="Facebook" size={16} />
            </a>
          )}
          {member.discord_url && (
            <a href={member.discord_url} target="_blank" rel="noopener noreferrer" className="p-2 text-steel hover:text-red-600 transition-colors flex items-center justify-center min-h-0">
              <SocialIcon platform="Discord" size={16} />
            </a>
          )}
          {member.youtube_url && (
            <a href={member.youtube_url} target="_blank" rel="noopener noreferrer" className="p-2 text-steel hover:text-red-600 transition-colors flex items-center justify-center min-h-0">
              <SocialIcon platform="YouTube" size={16} />
            </a>
          )}
          {member.custom_url && (
            <a href={member.custom_url} target="_blank" rel="noopener noreferrer" className="p-2 text-steel hover:text-red-600 transition-colors flex items-center justify-center min-h-0">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default function ManagementCarousel() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const controls = useAnimationControls();
  const containerRef = useRef(null);

  useEffect(() => {
    base44.entities.Management.filter({ is_active: true }, 'order')
      .then(setMembers)
      .finally(() => setLoading(false));
  }, []);

  if (loading || members.length === 0) return null;

  // Duplicate members to create infinite scroll effect
  const displayMembers = [...members, ...members, ...members, ...members];

  return (
    <div className="py-15 overflow-hidden bg-obsidian relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 mb-10 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] text-red-600 tracking-[0.4em] uppercase mb-4"
        >
          Operations Team
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl font-bold text-silver mb-4 tracking-tight"
        >
          Management Team
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-steel max-w-xl mx-auto"
        >
          Meet the professional minds managing the day-to-day operations and strategic growth of TOP-1 ESports.
        </motion.p>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative"
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() => controls.start({
          x: "-33.33%",
          transition: { duration: 18, ease: "linear", repeat: Infinity }
        })}
      >
        <motion.div
          animate={controls}
          initial={{ x: "0%" }}
          onViewportEnter={() => {
            controls.start({
              x: "-33.33%",
              transition: { duration: 18, ease: "linear", repeat: Infinity }
            });
          }}
          className="flex gap-6 px-3"
          style={{ width: 'fit-content' }}
        >
          {displayMembers.map((member, i) => (
            <ManagementCard key={`${member.id}-${i}`} member={member} />
          ))}
        </motion.div>

        {/* Faders */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-obsidian to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-obsidian to-transparent z-10" />
      </div>
    </div>
  );
}
