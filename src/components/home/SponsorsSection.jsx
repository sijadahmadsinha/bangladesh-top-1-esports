import { motion } from 'framer-motion';

// হার্ডকোডেড স্পনসর লিস্ট - আপনি এখান থেকে সরাসরি ইমেজ পরিবর্তন করতে পারবেন
const SPONSORS = [
  { name: 'Sponsor 1', image: 'https://cdn.freebiesupply.com/logos/large/2x/nike-4-logo-png-transparent.png' }, // এখানে ইমেজের পাথ দিন, যেমন: '/src/assets/logo.svg'
  { name: 'Sponsor 2', image: 'https://cdn.freebiesupply.com/logos/large/2x/nike-4-logo-png-transparent.png' },
  { name: 'Sponsor 3', image: 'https://cdn.freebiesupply.com/logos/large/2x/nike-4-logo-png-transparent.png' },
  { name: 'Sponsor 4', image: 'https://cdn.freebiesupply.com/logos/large/2x/nike-4-logo-png-transparent.png' },
  { name: 'Sponsor 5', image: 'https://cdn.freebiesupply.com/logos/large/2x/nike-4-logo-png-transparent.png' },
  { name: 'Sponsor 6', image: 'https://media.about.nike.com/img/cf68f541-fc92-4373-91cb-086ae0fe2f88/002-nike-logos-swoosh-white.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjozMzQsInRvcCI6MCwid2lkdGgiOjQwOTAsImhlaWdodCI6MjcyOH0sInJlc2l6ZSI6eyJ3aWR0aCI6Mzg0MH19fQ%3D%3D&s=9a07c8b736cf820f829f906d948eaffea72c5422c88d965fc6732d5d6a9c8b05' },
  { name: 'Sponsor 7', image: 'https://media.about.nike.com/img/cf68f541-fc92-4373-91cb-086ae0fe2f88/002-nike-logos-swoosh-white.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjozMzQsInRvcCI6MCwid2lkdGgiOjQwOTAsImhlaWdodCI6MjcyOH0sInJlc2l6ZSI6eyJ3aWR0aCI6Mzg0MH19fQ%3D%3D&s=9a07c8b736cf820f829f906d948eaffea72c5422c88d965fc6732d5d6a9c8b05' },
  { name: 'Sponsor 8', image: 'https://media.about.nike.com/img/cf68f541-fc92-4373-91cb-086ae0fe2f88/002-nike-logos-swoosh-white.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjozMzQsInRvcCI6MCwid2lkdGgiOjQwOTAsImhlaWdodCI6MjcyOH0sInJlc2l6ZSI6eyJ3aWR0aCI6Mzg0MH19fQ%3D%3D&s=9a07c8b736cf820f829f906d948eaffea72c5422c88d965fc6732d5d6a9c8b05' },
];

export default function SponsorsSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-16 py-12 micro-border-t">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-xs text-steel tracking-ultra uppercase text-center mb-10"
      >
        Partners
      </motion.p>

      <div className="overflow-hidden">
        <div className="flex gap-8 ticker-track w-max">
          {[...SPONSORS, ...SPONSORS].map((s, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-12 px-8 bg-red-600 border border-red-500/30 flex items-center justify-center transition-transform hover:scale-105 duration-300"
            >
              {s.image ? (
                <img 
                  src={s.image} 
                  alt={s.name} 
                  className="h-full w-auto object-contain max-h-7 brightness-0 invert" 
                />
              ) : (
                <span className="font-mono text-[10px] text-white tracking-widest uppercase">
                  {s.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
