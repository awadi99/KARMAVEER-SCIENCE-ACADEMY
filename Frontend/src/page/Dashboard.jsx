import React from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import Card from '../components/dashboard/Cards/Card';
import TestGraph from '../components/dashboard/Graph/TestGraph';
import RecentResults from '../components/dashboard/Results/RecentResults';
// import CardsList from '../components/dashboard/Cards/CardsList';

export default function Dashboard() {
    return (
        /* Removed 'overflow-x-hidden' (can cause scroll lag on iOS) 
           Added 'overscroll-none' to prevent rubber-banding lag 
        */
        <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-[#F8FAFF] dark:bg-[#050507] transform-gpu">
            
            <header className="mb-6 px-1">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                    Dashboard
                </h1>
                <div className="h-1 w-8 bg-indigo-600 rounded-full mt-1.5" />
            </header>

            {/* Remove LayoutGroup if you don't have items moving between sections */}
            <main className="w-full">
                <section className="mb-8">
                    <Card /> 
                </section>

                <section className="max-w-[1400px]">
                    <div className="flex items-center gap-4 px-1 mb-4">
                        <h2 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            Metrics
                        </h2>
                        <div className="h-px flex-1 bg-slate-200 dark:bg-white/5" />
                    </div>
                    {/* Only render list if needed to save mobile memory */}
                    <TestGraph/>
                    <RecentResults/>
                </section>
            </main>
        </div>
    );
}