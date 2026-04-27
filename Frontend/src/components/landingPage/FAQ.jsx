import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import faqData from '../../constants/FaqData';
import { Plus, Minus } from 'lucide-react';

const FAQItem = React.memo(({ item, isOpen, onClick }) => {
  return (
    /* Card: Deep slate background with a very subtle violet border glow */
    <div className="rounded-[1.2rem] border border-slate-100 dark:border-violet-500/20 overflow-hidden bg-white dark:bg-[#1E293B] transition-colors duration-300 contain-content shadow-sm">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-violet-500/5 transition-all outline-none transform-gpu"
      >
        <span className="text-base md:text-lg font-bold text-slate-900 dark:text-white tracking-tight pr-4">
          {item.question}
        </span>
        <div 
          /* Accent: Electric Violet (violet-600) */
          className={`shrink-0 p-2 rounded-full transition-all duration-300 transform-gpu ${
            isOpen ? 'bg-violet-600 text-white rotate-180 shadow-lg shadow-violet-500/20' : 'bg-slate-100 dark:bg-violet-500/10 text-slate-500 dark:text-violet-400'
          }`}
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: { height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }, opacity: { duration: 0.2 } }
            }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden transform-gpu"
          >
            <div className="px-8 pb-8 pt-2 text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-50 dark:border-violet-500/5 mt-2">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(prev => prev === index ? null : index);
  };

  return (
    /* Background: Deep Charcoal Blue (#0F172A) */
    <section id="faq" className="py-24 px-6 bg-white dark:bg-[#0F172A] relative overflow-hidden transition-colors duration-500">
      
      {/* Background glow: Subtle Violet aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-violet-500/[0.04] dark:bg-violet-400/[0.02] blur-[120px] pointer-events-none transform-gpu" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16 transform-gpu">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight">
          Frequently  <span className="text-violet-600 dark:text-violet-500">Asked Questions.</span>
          </h2>
          <div className="w-16 h-1 bg-violet-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={activeIndex === index}
              onClick={() => toggleIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}