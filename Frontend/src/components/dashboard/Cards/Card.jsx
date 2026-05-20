import React, { memo } from 'react';
import CardData from './CardData';

const DashboardCard = memo(({ card, value }) => {
    // Styles mapping ko central rakha hai
    const getStyles = (id) => {
        switch(id) {
            case 1: return { color: "text-indigo-600 dark:text-violet-400", bg: "bg-indigo-50 dark:bg-violet-500/10" };
            case 2: return { color: "text-violet-600 dark:text-fuchsia-400", bg: "bg-violet-50 dark:bg-fuchsia-500/10" };
            case 3: return { color: "text-blue-600 dark:text-sky-400", bg: "bg-blue-50 dark:bg-sky-500/10" };
            case 4: return { color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" };
            default: return { color: "text-slate-600", bg: "bg-slate-50" };
        }
    };

    const styles = getStyles(card.id);

    return (
        <div className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm dark:bg-[#0F172A] dark:border-slate-800 transition-all hover:border-blue-500/40 hover:shadow-md flex flex-col gap-5 overflow-hidden">
            <div className="flex flex-col gap-5 relative z-10">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${styles.bg} ${styles.color} border border-slate-100 dark:border-slate-700`}>
                    <card.Icon size={24} strokeWidth={2} />
                </div>
                <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        {card.title}
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                        {value}
                    </h3>
                </div>
            </div>
        </div>
    );
});

export default function Card({ stats }) {
    // Stats agar missing hai toh default object use karo taaki app crash na ho
    const data = stats || {};

    const getValue = (id) => {
        switch(id) {
            case 1: return data.totalStudents ?? "0";
            case 2: return data.totalTests ?? "0";
            case 3: return data.todayAttendance ?? "0";
            case 4: return data.someOtherMetric ?? "0"; // Agar 4th card hai toh yahan key add karo
            default: return "0";
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {CardData.map((card) => (
                <DashboardCard 
                    key={card.id} 
                    card={card} 
                    value={getValue(card.id)} 
                />
            ))}
        </div>
    );
}