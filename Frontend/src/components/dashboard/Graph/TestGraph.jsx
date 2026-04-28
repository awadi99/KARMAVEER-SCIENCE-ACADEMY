import React, { memo, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DATA = [
    { day: 'Mon', tests: 4 }, { day: 'Tue', tests: 7 },
    { day: 'Wed', tests: 5 }, { day: 'Thu', tests: 12 },
    { day: 'Fri', tests: 18 }, { day: 'Sat', tests: 14 },
    { day: 'Sun', tests: 9 },
];

/**
 * Optimized Tooltip: 
 * Removed backdrop-blur and gradients (expensive paints).
 * Uses solid academic blue.
 */
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

const TestGraph = memo(() => {
    // Memoize the chart structure to prevent re-calculations on scroll
    const chart = useMemo(() => (
        <LineChart data={DATA} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
            <CartesianGrid 
                vertical={false} 
                strokeDasharray="4 4" 
                stroke="currentColor" 
                className="text-slate-200 dark:text-slate-800" 
            />
            <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }}
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }}
            />
            <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ stroke: '#3b82f6', strokeWidth: 1 }}
                /* disable animation for instant hover response */
                isAnimationActive={false} 
            />
            <Line
                type="monotone"
                dataKey="tests"
                stroke="#2563eb" /* Royal Academic Blue */
                strokeWidth={3}
                dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                /* CRITICAL: isAnimationActive={false} removes SVG re-draw lag */
                isAnimationActive={false}
                className="transform-gpu"
            />
        </LineChart>
    ), []);

    return (
        <div className="w-full bg-white dark:bg-[#0F172A] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm isolate">
            <header className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50 uppercase tracking-tight">
                        Weekly Test Activity
                    </h2>
                    <p className="text-[11px] font-medium text-slate-500">Student participation metrics</p>
                </div>
                <div className="flex gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600 mt-1"></span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active</span>
                </div>
            </header>

            {/* Responsive Aspect Ratio:
                - Mobile: Tall enough to read (2/1)
                - Desktop: Wide and slim (4/1)
            */}
            <div className="w-full aspect-[2/1] lg:aspect-[4/1] relative transform-gpu" style={{ contain: 'content' }}>
                <ResponsiveContainer width="100%" height="100%">
                    {chart}
                </ResponsiveContainer>
            </div>
        </div>
    );
});

TestGraph.displayName = 'TestGraph';

export default TestGraph;