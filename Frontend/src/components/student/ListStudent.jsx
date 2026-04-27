import React, { memo } from 'react';
import { Trash2, Mail, Calendar, Hash } from 'lucide-react';

const STUDENT_DATA = [
    { id: 1, name: "Arjun Mehta", email: "arjun.m@academy.com", roll: "A-10", date: "12 April 2026" },
    { id: 2, name: "Sneha Patil", email: "sneha.p@academy.com", roll: "A-11", date: "15 April 2026" },
    { id: 3, name: "Rahul Vichare", email: "rahul.v@academy.com", roll: "A-12", date: "18 April 2026" },
];

const ListStudent = memo(() => {
    return (
        /* Removed heavy gradients: replaced with a simple solid border for performance */
        <div className="w-full rounded-[2rem] border border-indigo-500/20 dark:border-white/5 bg-white dark:bg-[#050507] overflow-hidden will-change-transform">
            
            {/* Desktop Table: Optimized for rapid scrolling */}
            <div className="hidden md:block">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-white/[0.02] text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                            <th className="px-8 py-4">Student</th>
                            <th className="px-8 py-4">Roll No</th>
                            <th className="px-8 py-4">Joined</th>
                            <th className="px-8 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-white/[0.03]">
                        {STUDENT_DATA.map((student) => (
                            <tr key={student.id} className="hover:bg-indigo-50/30 dark:hover:bg-indigo-500/[0.02] transition-colors duration-75">
                                <td className="px-8 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-black dark:text-white uppercase leading-tight">{student.name}</span>
                                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 leading-tight mt-0.5"><Mail size={10} /> {student.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-4">
                                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-500 text-[10px] font-black">{student.roll}</span>
                                </td>
                                <td className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase">{student.date}</td>
                                <td className="px-8 py-4 text-right">
                                    <button className="p-2 rounded-lg text-slate-300 hover:text-rose-500 active:scale-90 transition-all transform-gpu">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards: Simplified layout to prevent layout shift lag */}
            <div className="md:hidden divide-y divide-slate-50 dark:divide-white/[0.05]">
                {STUDENT_DATA.map((student) => (
                    <div key={student.id} className="p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs">
                                    {student.name.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-black dark:text-white uppercase leading-none">{student.name}</span>
                                    <span className="text-[10px] font-bold text-slate-500 mt-1">{student.email}</span>
                                </div>
                            </div>
                            <button className="p-2 rounded-xl text-rose-500 active:bg-rose-500/10 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1 bg-slate-50 dark:bg-white/[0.03] p-2 rounded-lg flex items-center gap-2">
                                <Hash size={12} className="text-indigo-500" />
                                <span className="text-[10px] font-black dark:text-slate-300 uppercase">{student.roll}</span>
                            </div>
                            <div className="flex-1 bg-slate-50 dark:bg-white/[0.03] p-2 rounded-lg flex items-center gap-2">
                                <Calendar size={12} className="text-indigo-500" />
                                <span className="text-[10px] font-black dark:text-slate-300 uppercase">{student.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default ListStudent;