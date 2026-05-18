import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import features from '../../constants/featuresData.js';

const FeatureCard = React.memo(({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: Math.min(index * 0.04, 0.2), 
        duration: 0.3, 
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      viewport={{ once: true, margin: "-10px" }}
      /* FIX: Added isolation-auto and backface-visibility
         This prevents the cards from "bleeding" into the Navbar's layer.
      */
      className="group relative p-8 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-md transform-gpu will-change-transform isolate"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div
        className={`
          mb-6 w-12 h-12 flex items-center justify-center rounded-xl border transition-colors duration-200
          ${feature.bgColor || 'bg-blue-50 dark:bg-blue-900/20'} 
          ${feature.iconColor || 'text-[#2563EB] dark:text-[#3B82F6]'} 
          ${feature.borderColor || 'border-blue-100 dark:border-blue-800'}
        `}
      >
        <feature.icon size={24} strokeWidth={2} />
      </div>

      <h3 className="text-xl font-bold text-[#111827] dark:text-[#F1F5F9] mb-3 tracking-tight">
        {feature.title}
      </h3>

      <p className="text-sm leading-relaxed text-[#6B7280] dark:text-[#94A3B8]">
        {feature.desc}
      </p>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

export default function Features() {
  const backgroundDecor = useMemo(() => (
    <div 
      className="absolute inset-0 pointer-events-none opacity-30 select-none transform-gpu"
      style={{
        backgroundImage: `radial-gradient(#e5e7eb 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        contain: 'strict',
        zIndex: -1 // Explicitly push behind to avoid Navbar overlap
      }}
    />
  ), []);

  return (
    <section 
      id="features" 
      className="relative py-24 px-6 bg-[#F9FAFB] dark:bg-[#0F172A] overflow-hidden isolate"
      style={{ 
        contain: 'paint layout', 
        contentVisibility: 'auto',
        WebkitFontSmoothing: 'antialiased'
      }}
    >
      
      {backgroundDecor}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16 text-left transform-gpu">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-6 transform-gpu"
          >
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6]">
              Why Choose KSA
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-[#111827] dark:text-[#F1F5F9] tracking-tight leading-tight mb-6">
            A Proven Path to <br />
            <span className="text-[#2563EB] dark:text-[#3B82F6]">Academic Excellence.</span>
          </h2>
          
          <p className="text-lg text-[#6B7280] dark:text-[#94A3B8] max-w-xl leading-relaxed">
            We provide a structured learning environment designed to help students master the complexities of modern science entrance exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transform-gpu">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}