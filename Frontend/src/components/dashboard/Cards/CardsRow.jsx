import CardData from "./CardData.js";
import { motion } from "framer-motion";

export default function CardsList() {
    return (
        <div className="flex flex-col gap-3 w-full">
            {CardData.map((card, index) => (
                <motion.div 
                    key={card.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (index * 0.04) }}
                    className={`
                        group flex flex-row items-center justify-between p-4 rounded-[1.8rem] border transition-all duration-300 transform-gpu
                        bg-white/70 dark:bg-[#0A0A0C]/30 backdrop-blur-md
                        ${card.border} hover:bg-white dark:hover:bg-white/5 hover:shadow-lg
                    `}
                >
                    <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${card.bg_color} ${card.color}`}>
                            <card.Icon size={20} />
                        </div>

                        <div>
                            <h3 className="text-[13px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight leading-none">
                                {card.title}
                            </h3>
                            <p className="hidden sm:block text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1 opacity-70">
                                Verified System Data
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="text-right">
                            <span className={`text-lg font-black tracking-tighter ${card.color} dark:text-white`}>
                                {card.value}
                            </span>
                        </div>
                        {/* Status Indicator Bar */}
                        <div className="hidden md:block h-1.5 w-16 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "65%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full ${card.bg_color.split(' ')[0]}`} 
                            />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}