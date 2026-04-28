import React, { memo } from 'react';
import { Trash2, Mail, Calendar, User, ShieldCheck } from 'lucide-react';

const STUDENT_DATA = [
    { id: 1, name: "Arjun Mehta", email: "arjun.m@academy.edu", roll: "2026-A10", date: "Registered: 12 April" },
    { id: 2, name: "Sneha Patil", email: "sneha.p@academy.edu", roll: "2026-A11", date: "Registered: 15 April" },
    { id: 3, name: "Rahul Vichare", email: "rahul.v@academy.edu", roll: "2026-A12", date: "Registered: 18 April" },
];

const ListStudent = memo(() => {
    return (
        <div 
            /* Academic Slate & Navy Blue Theme */
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] overflow-hidden isolate shadow-sm"
            style={{ contain: 'content', contentVisibility: 'auto' }}
        >
            
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table 
                    className="w-full text-left border-collapse"
                    style={{ tableLayout: 'fixed' }}
                >
                    <colgroup>
                        <col style={{ width: '35%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '20%' }} />
                    </colgroup>
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900/50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800">
                            <th className="px-6 py-4 font-semibold italic flex items-center gap-2">
                                <User size={12}/> Student Name
                            </th>
                            <th className="px-6 py-4 font-semibold">Roll Number</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 text-right font-semibold">Management</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {STUDENT_DATA.map((student) => (
                            <tr 
                                key={student.id} 
                                className="group hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors duration-75 transform-gpu"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 shrink-0 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-xs shadow-sm">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate tracking-tight">{student.name}</span>
                                            <span className="text-[11px] text-slate-500 flex items-center gap-1 truncate"><Mail size={10} /> {student.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-medium font-mono text-slate-600 dark:text-slate-400">
                                        {student.roll}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                                        <ShieldCheck size={12} />
                                        <span className="text-[11px] font-bold uppercase tracking-tight">{student.date}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {/* Bin Icon Restored */}
                                    <button className="p-2 rounded-lg text-slate-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 active:scale-90 transition-all transform-gpu">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
                {STUDENT_DATA.map((student) => (
                    <div key={student.id} className="p-5 transform-gpu bg-white dark:bg-slate-900">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                                {student.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{student.name}</h4>
                                <p className="text-xs text-slate-500 truncate">{student.email}</p>
                            </div>
                            {/* Bin Icon for Mobile */}
                            <button className="p-2 text-slate-300 hover:text-red-500 active:scale-90">
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                                <p className="text-[9px] uppercase font-bold text-slate-400 mb-1">ID Code</p>
                                <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">{student.roll}</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                                <p className="text-[9px] uppercase font-bold text-slate-400 mb-1">Status</p>
                                <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Enrolled</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default ListStudent;