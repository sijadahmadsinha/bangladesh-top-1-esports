import { motion } from 'framer-motion';

// হার্ডকোডেড স্পনসর লিস্ট - আপনি এখান থেকে সরাসরি ইমেজ পরিবর্তন করতে পারবেন
const SPONSORS = [
  { name: 'Sponsor 1', image: 'src/assets/logo.svg' }, // এখানে ইমেজের পাথ দিন, যেমন: '/src/assets/logo.svg'
  { name: 'Sponsor 2', image: 'src/assets/logo.svg' },
  { name: 'Sponsor 3', image: 'src/assets/logo.svg' },
  { name: 'Sponsor 4', image: 'src/assets/logo.svg' },
  { name: 'Sponsor 5', image: 'src/assets/logo.svg' },
  { name: 'Sponsor 6', image: 'src/assets/logo.svg' },
  { name: 'Sponsor 7', image: 'src/assets/logo.svg' },
  { name: 'Sponsor 8', image: 'src/assets/logo.svg' },
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
              className="flex-shrink-0 h-12 px-8 bg-graphene border border-silver/10 flex items-center justify-center transition-transform hover:scale-105 hover:bg-white/5 duration-300"
            >
              {s.image ? (
                <img 
                  src={s.image} 
                  alt={s.name} 
                  className="h-full w-auto object-contain max-h-7" 
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
