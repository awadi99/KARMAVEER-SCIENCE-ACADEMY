import React from 'react';
import { motion } from 'framer-motion';
import CardData from './CardData';

export default function Card() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {CardData.map((card, index) => (
                <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        delay: index * 0.02, // Ultra-fast stagger for mobile
                        duration: 0.25,
                        ease: "easeOut"
                    }}
                    /* PERFORMANCE FIXES:
                       1. 'backdrop-blur' removed for mobile (CPU killer)
                       2. 'shadow' simplified
                       3. 'whileTap' added for mobile feedback instead of 'hover'
                    */
                    className={`
                        relative p-5 rounded-[1.8rem] transition-colors duration-200 transform-gpu
                        bg-white border ${card.border} shadow-sm
                        dark:bg-[#0E0E10] dark:border-white/5
                        active:scale-[0.98] md:hover:-translate-y-1 md:hover:shadow-md
                    `}
                >
                    <div className="flex flex-col gap-4">
                        <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${card.bg_color} ${card.color}`}>
                            <card.Icon size={22} strokeWidth={2.5} />
                        </div>
                        
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-0.5">
                                {card.title}
                            </p>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                                {card.value}
                            </h3>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}