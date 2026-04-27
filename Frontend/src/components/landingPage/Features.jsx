import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import features from '../../constants/featuresData.js';

// Memoized Card - Cleaned up to feel more "Normal"
const FeatureCard = React.memo(({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.4, 
        ease: "easeOut" 
      }}
      viewport={{ once: true }}
      /* Normalizing the card: 
         - Removed extreme rounding (now rounded-2xl)
         - Changed background to your specified Card Backgrounds
         - Removed italic/uppercase fonts
      */
      className="group relative p-8 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 transition-shadow hover:shadow-md"
    >
      {/* Icon: Using your Primary Blue (#2563EB) logic */}
      <div
        className={`
          mb-6 w-12 h-12 flex items-center justify-center rounded-xl border transition-colors
          ${feature.bgColor || 'bg-blue-50 dark:bg-blue-900/20'} 
          ${feature.iconColor || 'text-[#2563EB] dark:text-[#3B82F6]'} 
          ${feature.borderColor || 'border-blue-100 dark:border-blue-800'}
        `}
      >
        <feature.icon size={24} strokeWidth={2} />
      </div>

      {/* Title: Standard bold text, no italics, no forced uppercase */}
      <h3 className="text-xl font-bold text-[#111827] dark:text-[#F1F5F9] mb-3 tracking-tight">
        {feature.title}
      </h3>

      {/* Description: Normal sentence case for better readability */}
      <p className="text-sm leading-relaxed text-[#6B7280] dark:text-[#94A3B8]">
        {feature.desc}
      </p>
    </motion.div>
  );
});

export default function Features() {
  // Simplified background - removed the distracting glowing blobs
  const backgroundDecor = useMemo(() => (
    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none" />
  ), []);

  return (
    <section id="features" className="relative py-24 px-6 bg-[#F9FAFB] dark:bg-[#0F172A] overflow-hidden">
      
      {backgroundDecor}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16 text-left">
          {/* Badge: Standard academic label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-6"
          >
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6]">
              Why Choose KSA
            </span>
          </motion.div>

          {/* Heading: Clean, professional, and high-contrast */}
          <h2 className="text-3xl md:text-5xl font-bold text-[#111827] dark:text-[#F1F5F9] tracking-tight leading-tight mb-6">
            A Proven Path to <br />
            <span className="text-[#2563EB] dark:text-[#3B82F6]">Academic Excellence.</span>
          </h2>
          
          <p className="text-lg text-[#6B7280] dark:text-[#94A3B8] max-w-xl leading-relaxed">
            We provide a structured learning environment designed to help students master the complexities of modern science entrance exams.
          </p>
        </div>

        {/* Grid: Standard spacing and alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}