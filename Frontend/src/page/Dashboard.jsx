import React, { lazy, Suspense, useState, useEffect } from 'react';
import { GraduationCap, LayoutDashboard, Search, AlertCircle } from 'lucide-react';
import { useTest } from '../hook/useTest.js';

const Card = lazy(() => import('../components/dashboard/Cards/Card'));
const TestGraph = lazy(() => import('../components/dashboard/Graph/TestGraph'));
const RecentResults = lazy(() => import('../components/dashboard/Results/RecentResults'));

const LoadingBlock = ({ height }) => (
    <div className={`w-full ${height} bg-slate-100 dark:bg-slate-900 animate-pulse rounded-2xl border border-slate-200 dark:border-slate-800`} />
);

export default function Dashboard() {
    const [selectedStd, setSelectedStd] = useState(11);
    const [searchTitle, setSearchTitle] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const { useDashboardSummary } = useTest();
    const { data: summaryData, isLoading:isSummaryLoading } = useDashboardSummary(null, selectedStd);

    // 🚀 Debounce Logic: 1000 students ka data fetch karne se pehle wait karega
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchTitle), 500);
        return () => clearTimeout(timer);
    }, [searchTitle]);

    const { getStats } = useTest();
    const { data, isLoading, isError, error } = getStats(debouncedSearch, selectedStd);


    return (
        <div className="min-h-screen w-full p-4 sm:p-6 lg:p-10 bg-[#F1F5F9] dark:bg-[#0B0F1A] transition-colors duration-300">

            <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-blue-700 flex items-center justify-center text-white shadow-lg">
                        <GraduationCap size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">
                            Institutional Dashboard
                        </h1>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5">
                            Standard {selectedStd} Overview
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                            type="text"
                            placeholder="Enter Test Title (e.g. Mock Test 1)"
                            className="pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold focus:ring-2 focus:ring-blue-600 dark:text-white transition-all w-64"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                        />
                    </div>

                    <div className="flex bg-slate-200 dark:bg-slate-900 p-1 rounded-xl border border-slate-300 dark:border-slate-800">
                        {[11, 12].map((std) => (
                            <button
                                key={std}
                                onClick={() => setSelectedStd(std)}
                                className={`px-5 py-1.5 rounded-lg text-[10px] font-black transition-all ${selectedStd === std
                                        ? 'bg-white dark:bg-slate-700 text-blue-700 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                STD {std}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="w-full space-y-10">
                {/* ❌ Error State */}
                {isError && (
                    <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-500 text-xs font-bold">
                        <AlertCircle size={16} />
                        {error.message || "Test not found for this standard."}
                    </div>
                )}

                <section>
                    <Suspense fallback={<LoadingBlock height="h-32" />}>
                        {isSummaryLoading ? (
                            <LoadingBlock height="h-32" />
                        ) : (
                            <Card stats={summaryData?.summary} />
                        )}
                    </Suspense>
                </section>

                <section className="max-w-[1500px] space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                            <LayoutDashboard size={14} />
                            <h2 className="text-[11px] font-black uppercase tracking-[0.2em]">Growth & Analytics</h2>
                        </div>
                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                    </div>

                    <div className="space-y-8">
                        <Suspense fallback={<LoadingBlock height="h-[400px]" />}>
                            {isLoading ? (
                                <LoadingBlock height="h-[400px]" />
                            ) : (
                                <TestGraph testData={summaryData?.data?.weeklyActivity} />
                            )}
                        </Suspense>

                        <div className="pt-2">
                            <Suspense fallback={<LoadingBlock height="h-[300px]" />}>
                                <RecentResults
                                    presentList={data?.presentList || []}
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