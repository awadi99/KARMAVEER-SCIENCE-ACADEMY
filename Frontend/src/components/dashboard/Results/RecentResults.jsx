import React, { memo } from 'react';
import { CheckCircle2, XCircle, UserMinus, MoreHorizontal } from 'lucide-react';

const PASS_DATA = [
    { id: 1, name: "Arjun Mehta", subject: "Math", score: "92%", status: "Pass" },
    { id: 2, name: "Sneha Patil", subject: "Physics", score: "88%", status: "Pass" },
    { id: 3, name: "Rahul Vichare", subject: "Chem", score: "34%", status: "Fail" },
];

const PENDING_DATA = [
    { id: 101, name: "Ananya Iyer", roll: "A-12" },
    { id: 102, name: "Ishaan Shah", roll: "A-15" },
];

const RecentResults = memo(() => {
    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            
            {/* LEFT SIDE: Recent Results Table (Takes 2/3 space) */}
            <div className="lg:col-span-2 p-[1px] rounded-[2rem] bg-gradient-to-br from-indigo-500/40 via-purple-500/20 to-transparent">
                <div className="bg-white dark:bg-[#050507] rounded-[calc(2rem-1px)] p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] dark:text-white">Recent Results</h3>
                        <div className="h-8 w-8 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center cursor-pointer">
                            <MoreHorizontal size={16} className="text-slate-400" />
                        </div>
                    </div>

                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <th className="px-4 py-2">Student</th>
                                    <th className="px-4 py-2">Subject</th>
                                    <th className="px-4 py-2 text-center">Score</th>
                                    <th className="px-4 py-2 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PASS_DATA.map((item) => (
                                    <tr key={item.id} className="group transition-all transform-gpu active:scale-[0.99]">
                                        <td className="px-4 py-3 bg-slate-50/50 dark:bg-white/[0.02] rounded-l-2xl border-y border-l border-slate-100/50 dark:border-white/5">
                                            <span className="text-[11px] font-black dark:text-white uppercase tracking-tight">{item.name}</span>
                                        </td>
                                        <td className="px-4 py-3 bg-slate-50/50 dark:bg-white/[0.02] border-y border-slate-100/50 dark:border-white/5">
                                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{item.subject}</span>
                                        </td>
                                        <td className="px-4 py-3 bg-slate-50/50 dark:bg-white/[0.02] border-y border-slate-100/50 dark:border-white/5 text-center">
                                            <span className={`text-[11px] font-black ${item.status === 'Pass' ? 'text-indigo-500' : 'text-rose-500'}`}>{item.score}</span>
                                        </td>
                                        <td className="px-4 py-3 bg-slate-50/50 dark:bg-white/[0.02] rounded-r-2xl border-y border-r border-slate-100/50 dark:border-white/5 text-right">
                                            <div className="inline-flex items-center gap-1.5">
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${item.status === 'Pass' ? 'text-green-500' : 'text-rose-500'}`}>{item.status}</span>
                                                {item.status === 'Pass' ? <CheckCircle2 size={12} className="text-green-500" /> : <XCircle size={12} className="text-rose-500" />}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Not Tested / Remaining (Takes 1/3 space) */}
            <div className="p-[1px] rounded-[2rem] bg-gradient-to-br from-purple-500/40 via-indigo-500/10 to-transparent">
                <div className="bg-white dark:bg-[#050507] rounded-[calc(2rem-1px)] p-6 h-full">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-9 w-9 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                            <UserMinus size={18} />
                        </div>
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest dark:text-white leading-none">Remaining</h3>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Pending Exam</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {PENDING_DATA.map((student) => (
                            <div key={student.id} className="flex items-center justify-between p-4 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 group hover:border-indigo-500/50 transition-colors">
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-black dark:text-slate-200 uppercase">{student.name}</span>
                                    <span className="text-[9px] font-bold text-slate-400">Roll: {student.roll}</span>
                                </div>
                                <button className="text-[8px] font-black uppercase px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-indigo-500 hover:text-white transition-all">
                                    Remind
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
});

RecentResults.displayName = 'RecentResults';

export default RecentResults;