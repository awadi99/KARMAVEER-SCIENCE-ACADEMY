import React, { memo } from 'react';
import CardData from './CardData';

// 1. Memoized child prevents the Grid from re-rendering all cards 
// if only one card's internal state (like a local hover state) changed.
const DashboardCard = memo(({ card }) => (
    <div
        className={`
            relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm
            dark:bg-[#0F172A] dark:border-slate-800
            /* 2. Hardware Acceleration: use transform-gpu and will-change */
            transition-transform duration-200 ease-out transform-gpu will-change-transform
            hover:border-blue-500/40 hover:shadow-md active:scale-[0.98]
            flex flex-col gap-5 overflow-hidden
        `}
        /* 3. Backface Visibility: prevents 'flicker' on Safari/Mobile Chrome during scales */
        style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            contain: 'content' // Critical: Tells browser this card's changes never affect outside layout
        }}
    >
        <div className="flex flex-col gap-5 relative z-10">
            {/* Icon Container: Static sizes to prevent layout shift */}
            <div className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0 
                bg-slate-50 dark:bg-slate-800/50 text-blue-600 dark:text-blue-400
                border border-slate-100 dark:border-slate-700">
                <card.Icon size={24} strokeWidth={2} />
            </div>

            <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {card.title}
                </p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                    {card.value}
                </h3>
            </div>
        </div>

        {/* 4. Optimized Decoration: Absolute elements are cheaper to render */}
        <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-blue-500/20" />
    </div>
));

export default function Card() {
    return (
        <div
            /* 5. Layout Isolation:
               - isolate: creates a new stacking context (faster z-index sorting)
               - contain: layout: ensures card hovers don't trigger global page reflows
            */
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full isolate"
            style={{ 
                contain: 'layout',
                contentVisibility: 'auto', // Skips rendering cards if they are off-screen (Great for Mobile)
                containIntrinsicSize: '0 150px' // Placeholder size for the skipped rendering
            }}
        >
            {CardData.map((card) => (
                <DashboardCard key={card.id} card={card} />
            ))}
        </div>
    );
}