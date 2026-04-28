import React, { lazy, Suspense } from 'react';
import { GraduationCap, LayoutDashboard, Settings, User } from 'lucide-react';

// Keep lazy loading but add Suspense fallbacks for a smoother experience
const Card = lazy(() => import('../components/dashboard/Cards/Card'));
const TestGraph = lazy(() => import('../components/dashboard/Graph/TestGraph'));
const RecentResults = lazy(() => import('../components/dashboard/Results/RecentResults'));

// A lightweight skeleton to prevent layout shift (Jank)
const LoadingBlock = ({ height }) => (
    <div className={`w-full ${height} bg-slate-100 dark:bg-slate-900 animate-pulse rounded-2xl border border-slate-200 dark:border-slate-800`} />
);

export default function Dashboard() {
    return (
        /* - bg-[#F1F5F9]: The "Academic Blue-Grey" standard.
           - selection:bg-blue-100: Custom highlights for a polished feel.
        */
        <div className="min-h-screen w-full p-4 sm:p-6 lg:p-10 bg-[#F1F5F9] dark:bg-[#0B0F1A] selection:bg-blue-100 dark:selection:bg-blue-900/30">
            
            {/* Professional Navigation Header */}
            <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-blue-700 flex items-center justify-center text-white shadow-lg shadow-blue-700/20 ring-4 ring-white dark:ring-slate-900">
                        <GraduationCap size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                            Institutional Dashboard
                        </h1>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5">
                            Academic Year 
                        </p>
                    </div>
                </div>

                {/* Quick Actions - Very common in EDU portals */}
                <div className="flex items-center gap-2">
                </div>
            </header>

            <main className="w-full space-y-10">
                {/* 1. Key Statistics Cards (Grid) */}
                <section style={{ contain: 'layout' }}>
                    <Suspense fallback={<LoadingBlock height="h-32" />}>
                        <Card />
                    </Suspense>
                </section>

                {/* 2. Primary Metrics Section */}
                <section className="max-w-[1500px] space-y-8">
                    <div className="flex items-center gap-4 px-1">
                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                            <LayoutDashboard size={14} />
                            <h2 className="text-[11px] font-black uppercase tracking-[0.2em]">
                                Growth & Analytics
                            </h2>
                        </div>
                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                    </div>

                    {/* GPU-Layered Data Display for Zero Lag */}
                    <div className="space-y-8 transform-gpu" style={{ contain: 'paint layout' }}>
                        <Suspense fallback={<LoadingBlock height="h-[400px]" />}>
                            <TestGraph />
                        </Suspense>
                        
                        <div className="pt-2">
                            <Suspense fallback={<LoadingBlock height="h-[300px]" />}>
                                <RecentResults />
                            </Suspense>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}