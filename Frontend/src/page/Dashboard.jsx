import React, { lazy, Suspense, useState } from 'react';
import { GraduationCap, LayoutDashboard, Search } from 'lucide-react';
import { useTest } from '../hook/useTest.js';

// Components
const Card = lazy(() => import('../components/dashboard/Cards/Card'));
const TestGraph = lazy(() => import('../components/dashboard/Graph/TestGraph'));
const RecentResults = lazy(() => import('../components/dashboard/Results/RecentResults'));

const LoadingBlock = ({ height }) => (
    <div className={`w-full ${height} bg-slate-100 dark:bg-slate-900 animate-pulse rounded-2xl border border-slate-200 dark:border-slate-800`} />
);

export default function Dashboard() {
    // 🚀 STATE: Standard toggle aur Test search ke liye
    const [selectedStd, setSelectedStd] = useState(11);
    const [activeTestId, setActiveTestId] = useState(""); 

    // 🚀 DATA FETCHING: Backend se 11/12th ka data mangao
    const { getStats } = useTest();
    const { data, isLoading } = getStats(activeTestId, selectedStd);

    return (
        <div className="min-h-screen w-full p-4 sm:p-6 lg:p-10 bg-[#F1F5F9] dark:bg-[#0B0F1A] selection:bg-blue-100 dark:selection:bg-blue-900/30">
            
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
                            Standard {selectedStd} Overview
                        </p>
                    </div>
                </div>

                {/* 🚀 TOGGLE & SEARCH: Dashboard top actions */}
                <div className="flex flex-wrap items-center gap-4">
                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input 
                            type="text" 
                            placeholder="Enter Test ID..." 
                            className="pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={activeTestId}
                            onChange={(e) => setActiveTestId(e.target.value)}
                        />
                    </div>

                    {/* Standard Toggle */}
                    <div className="flex bg-slate-200 dark:bg-slate-900 p-1 rounded-xl border border-slate-300 dark:border-slate-800">
                        {[11, 12].map((std) => (
                            <button
                                key={std}
                                onClick={() => setSelectedStd(std)}
                                className={`px-5 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                                    selectedStd === std 
                                    ? 'bg-white dark:bg-slate-700 text-blue-700 shadow-sm' 
                                    : 'text-slate-500'
                                }`}
                            >
                                STD {std}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="w-full space-y-10">
                {/* Stats Cards (Passing data if needed) */}
                <section style={{ contain: 'layout' }}>
                    <Suspense fallback={<LoadingBlock height="h-32" />}>
                        <Card stats={data?.stats} />
                    </Suspense>
                </section>

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

                    <div className="space-y-8 transform-gpu" style={{ contain: 'paint layout' }}>
                        <Suspense fallback={<LoadingBlock height="h-[400px]" />}>
                            <TestGraph testData={data?.resultList} />
                        </Suspense>
                        
                        <div className="pt-2">
                            <Suspense fallback={<LoadingBlock height="h-[300px]" />}>
                                {/* 🚀 REAL DATA PASSING TO YOUR COMPONENT */}
                                <RecentResults 
                                    resultList={data?.resultList || []} 
                                    absentList={data?.absentList || []} 
                                />
                            </Suspense>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}