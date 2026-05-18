import { motion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import ManagementCarousel from '../components/ManagementCarousel';
import { ArrowRight } from 'lucide-react';
import SocialIcon from '../components/ui/SocialIcon';

const SOCIALS = [
  {
    name: 'Discord',
    handle: 'Upcoming',
    description: 'Join our Discord server for live updates, match discussions, and community events.',
    url: 'https://discord.gg/top1esports',
    members: '100K+',
    cta: 'Join Server',
    color: 'from-[#5865F2]/20 to-transparent',
  },
  {
    name: 'YouTube',
    handle: '@raadvaiesports',
    description: 'Watch tournament videos, highlights,  behind-the-scenes content, and many more.',
    url: 'https://youtube.com/@raadvaiesports?si=xI5DSFtjiElxI7q_',
    members: '110K+',
    cta: 'Subscribe',
    color: 'from-red-900/20 to-transparent',
  },
  {
    name: 'Facebook Page',
    handle: 'Bangladesh Top.1',
    description: 'Follow our official Facebook page for announcements, matches, and team news.',
    url: 'https://www.facebook.com/profile.php?id=61583270264416',
    members: '50K+',
    cta: 'Follow',
    color: 'from-blue-900/20 to-transparent',
  },
  {
    name: 'Facebook Group',
    handle: 'TOP-1 Esports Group',
    description: 'Join our official group to share highlights, interact with players, and discuss matches.',
    url: 'https://www.facebook.com/groups/1139101504644099/',
    members: '20K+',
    cta: 'Join Group',
    color: 'from-blue-950/20 to-transparent',
  },
  {
    name: 'TikTok',
    handle: '@raadvaiyt.bdtop1',
    description: 'Short clips, highlights, and fun content from the team.',
    url: 'https://www.tiktok.com/@raadvaiyt.bdtop1',
    members: '1m+',
    cta: 'Follow',
    color: 'from-pink-900/10 to-transparent',
  },
];

export default function Community() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-40 pb-8 lg:pb-32">
        <SectionHeader
          label="The Community"
          title="Join TOP-1"
          subtitle="Be part of Bangladesh's most competitive Free Fire community. Follow our journey, interact with players, and never miss a match."
        />

        {/* Social cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {SOCIALS.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className={`micro-border bg-graphene p-6 block group relative overflow-hidden min-h-0`}
              data-cursor-expand
            >
              {/* BG gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-silver/5 border border-silver/10 flex items-center justify-center">
                    <SocialIcon platform={social.name} size={22} />
                  </div>
                  <span className="font-mono text-xs text-tactical-green">{social.members} Followers</span>
                </div>

                <h3 className="font-heading font-semibold text-silver text-xl mb-1">{social.name}</h3>
                <p className="font-mono text-xs text-steel mb-4">{social.handle}</p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{social.description}</p>

                <span className="flex items-center gap-2 font-mono text-xs text-steel group-hover:text-silver transition-colors">
                  {social.cta}
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Contact section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="micro-border bg-graphene p-6 md:p-10 mb-15"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="font-mono text-xs text-steel tracking-ultra uppercase mb-4">Contact Us</p>
              <h2 className="font-heading text-3xl font-semibold text-silver mb-4">Get In Touch</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                For sponsorships, collaborations, or press inquiries, reach out to us directly.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-steel tracking-ultra uppercase w-24">Email</span>
                  <a href="mailto:contact@top1esports.gg" className="font-body text-sm text-silver hover:text-silver/70 transition-colors min-h-0">
                    contact@top1esports.gg
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-steel tracking-ultra uppercase w-24">Discord</span>
                  <a href="https://discord.gg/top1esports" className="font-body text-sm text-silver hover:text-silver/70 transition-colors min-h-0">
                    discord.gg/top1esports
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-steel tracking-ultra uppercase w-24">Location</span>
                  <span className="font-body text-sm text-silver">Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>

            {/* Join team callout */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs text-steel tracking-ultra uppercase mb-4">Open Tryouts</p>
                <h3 className="font-heading text-2xl font-semibold text-silver mb-3">Want to Join TOP-1?</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
                  We're always looking for talented players. If you believe you have what it takes to compete at the highest level, apply through our Discord.
                </p>
              </div>
              <a
                href="https://discord.gg/top1esports"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-silver text-obsidian px-6 py-3 font-heading font-semibold text-sm tracking-widest uppercase hover:bg-silver/90 transition-all group min-h-0 w-fit"
              >
                Apply Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Management Section */}
      <ManagementCarousel />
    </motion.div>
  );
}