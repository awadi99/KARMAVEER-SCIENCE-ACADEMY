import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import faqData from '../../constants/FaQData';
import { Plus, Minus } from 'lucide-react';

// Memoized individual item to prevent re-rendering the whole list 
// when only one item opens.
const FAQItem = React.memo(({ item, isOpen, onClick }) => {
  return (
    <div className="rounded-[2rem] border border-slate-100 dark:border-purple-500/10 overflow-hidden bg-white dark:bg-purple-900/5 transition-colors duration-300 contain-content">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-purple-900/10 transition-all outline-none transform-gpu"
      >
        <span className="text-base md:text-lg font-bold dark:text-white tracking-tight pr-4">
          {item.question}
        </span>
        <div 
          className={`shrink-0 p-2 rounded-full transition-transform duration-300 transform-gpu ${
            isOpen ? 'bg-purple-600 text-white rotate-180' : 'bg-slate-200 dark:bg-white/10'
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
            <div className="px-8 pb-8 pt-2 text-sm md:text-base text-slate-500 dark:text-purple-200/60 font-medium leading-relaxed">
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

  // Memoize the handler to prevent unnecessary re-renders of child components
  const toggleIndex = useMemo(() => (index) => {
    setActiveIndex(prev => prev === index ? null : index);
  }, []);

  return (
    <section id="faq" className="py-24 px-6 bg-white dark:bg-[#020105] relative overflow-hidden">
      {/* Performance optimized background glow - simplified */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-600/[0.02] blur-[120px] pointer-events-none transform-gpu" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12 transform-gpu">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic leading-none">
            Your <span className="text-purple-600">Doubts</span>, <br className="md:hidden" /> Answered.
          </h2>
        </div>

        <div className="space-y-3">
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