import React, { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = memo(({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 dark:bg-blue-950 px-3 py-1.5 rounded-lg shadow-xl border border-slate-700">
                <p className="text-[10px] font-bold text-white uppercase tracking-wider">
                    {`${payload[0].value} Tests Completed`}
                </p>
            </div>
        );
    }
    return null;
});

const TestGraph = memo(({ testData }) => {
    // Agar data nahi aaya toh empty array use karo
    const data = testData || [];

    return (
        <div className="w-full bg-white dark:bg-[#0F172A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm isolate">
            <header className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50 uppercase tracking-tight">Weekly Test Activity</h2>
                </div>
            </header>

            <div className="w-full aspect-[2/1] lg:aspect-[4/1] relative transform-gpu" style={{ contain: 'content' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="4 4" className="text-slate-200 dark:text-slate-800" />
                        <XAxis 
                            dataKey="day" 
                            axisLine={false} tickLine={false} 
                            tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} dy={10} 
                        />
                        <YAxis 
                            axisLine={false} tickLine={false} 
                            tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} 
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1 }} isAnimationActive={false} />
                        <Line
                            type="monotone"
                            dataKey="tests" // API mein jo key hai (e.g., 'tests' ya 'count')
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6 }}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
});

TestGraph.displayName = 'TestGraph';
export default TestGraph;