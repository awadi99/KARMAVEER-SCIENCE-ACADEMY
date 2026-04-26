import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import features from '../../constants/featuresData.js';

// Memoized Card to prevent unnecessary re-renders during parent state changes
const FeatureCard = React.memo(({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }} // Reduced y offset for smoother entry
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.03, // Faster stagger
        duration: 0.3, 
        ease: [0.23, 1, 0.32, 1] // Snappy cubic-bezier
      }}
      viewport={{ once: true, margin: "-20px" }}
      className="group relative p-8 rounded-[2rem] bg-white dark:bg-[#080808] border border-slate-200/60 dark:border-white/[0.05] transition-all duration-300 transform-gpu will-change-transform hover:shadow-xl dark:hover:shadow-none"
      style={{ backfaceVisibility: 'hidden' }} // Forces GPU layer promotion
    >
      <div
        className={`
          mb-8 w-12 h-12 flex items-center justify-center rounded-2xl border transition-transform duration-300
          group-hover:scale-110 group-hover:rotate-[5deg] transform-gpu
          ${feature.bgColor} ${feature.iconColor} ${feature.borderColor}
        `}
      >
        <feature.icon size={22} strokeWidth={2.5} />
      </div>

      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 tracking-tight italic uppercase">
        {feature.title}
      </h3>

      <p className="text-[13px] leading-relaxed text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tight">
        {feature.desc}
      </p>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className={`w-1.5 h-1.5 rounded-full ${feature.iconColor.split(' ')[0]}`} />
      </div>
    </motion.div>
  );
});

export default function Features() {
  // Pre-render glows to prevent re-calculation on scroll
  const backgroundDecor = useMemo(() => (
    <>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-indigo-200/20 dark:from-indigo-900/10 to-transparent pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-violet-200/20 dark:from-violet-900/10 to-transparent pointer-events-none transform-gpu" />
    </>
  ), []);

  return (
    <section id="features" className="relative py-24 px-6 bg-[#fafafa] dark:bg-[#030303] overflow-hidden contain-paint">
      
      {backgroundDecor}

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="max-w-2xl mb-20 text-left transform-gpu">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
              The KSA Advantage
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1] mb-6 italic uppercase">
            Shaping minds, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 dark:from-violet-400 dark:to-fuchsia-400">
              building futures.
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-md font-bold leading-relaxed uppercase tracking-tight">
            Empowering students with the knowledge, discipline, and confidence required to excel in MHT-CET, JEE, and NEET.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transform-gpu">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}