import React, { memo, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DATA = [
    { day: 'Mon', tests: 4 }, { day: 'Tue', tests: 7 },
    { day: 'Wed', tests: 5 }, { day: 'Thu', tests: 12 },
    { day: 'Fri', tests: 18 }, { day: 'Sat', tests: 14 },
    { day: 'Sun', tests: 9 },
];

const CustomTooltip = memo(({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0A0A0C] border border-indigo-500/40 px-3 py-1 rounded-xl shadow-2xl backdrop-blur-md">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">
                    {`${payload[0].value} Tests`}
                </p>
            </div>
        );
    }
    return null;
});

const TestGraph = memo(() => {
    const chart = useMemo(() => (
        <LineChart data={DATA} margin={{ top: 5, right: 10, left: -35, bottom: 0 }}>
            <CartesianGrid 
                vertical={false} 
                strokeDasharray="6 6" 
                stroke="currentColor" 
                className="text-slate-200/30 dark:text-white/5" 
            />
            <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 8, fontWeight: 800, fill: '#94a3b8' }}
                dy={8}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 8, fontWeight: 800, fill: '#94a3b8' }}
            />
            <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
                isAnimationActive={false}
            />
            <Line
                type="monotone"
                dataKey="tests"
                stroke="#818cf8"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#818cf8', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 5, strokeWidth: 0 }}
                isAnimationActive={false}
                className="transform-gpu"
            />
        </LineChart>
    ), []);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest leading-none mb-1">Performance</span>
                    <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">Tests Conducted</h2>
                </div>
            </div>

            {/* SLIMMER ASPECT RATIO: Changed from 16/9 to 3/1 for a more compact vertical footprint */}
            <div className="p-[1px] rounded-[2rem] bg-gradient-to-br from-indigo-500/40 via-purple-500/20 to-transparent shadow-md shadow-indigo-500/5">
                <div className="w-full aspect-[2/1] sm:aspect-[3/1] lg:aspect-[4/1] bg-white dark:bg-[#050507] rounded-[calc(2rem-1px)] p-4 sm:p-5 relative transform-gpu">
                    <ResponsiveContainer width="100%" height="100%">
                        {chart}
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
});

TestGraph.displayName = 'TestGraph';

export default TestGraph;