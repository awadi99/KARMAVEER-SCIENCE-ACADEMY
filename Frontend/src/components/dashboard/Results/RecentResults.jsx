import React, { memo } from 'react';
import { CheckCircle2, AlertCircle, Bell, UserMinus, MoreVertical, GraduationCap } from 'lucide-react';

const RecentResults = memo(({ resultList = [], absentList = [] }) => {
    return (
        <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8 transform-gpu isolate">
            
            {/* LEFT SIDE: Recent Results (Real Data from Backend) */}
            <div className="xl:col-span-2 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.01]">
                    <div className="flex items-center gap-3">
                        <GraduationCap className="text-blue-600" size={20} />
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">Recent Examinations</h3>
                    </div>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                        <MoreVertical size={18} className="text-slate-400" />
                    </button>
                </div>

                <div className="p-4 overflow-x-auto no-scrollbar">
                    <div className="flex items-center px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800 mb-2">
                        <span className="flex-1">Student</span>
                        <span className="flex-1 hidden md:block">Score Details</span>
                        <span className="w-20 text-center">Marks</span>
                        <span className="w-24 text-right">Status</span>
                    </div>

                    <div className="space-y-2">
                        {resultList.length > 0 ? resultList.map((item) => (
                            <div key={item._id} 
                                className="flex items-center px-4 py-4 rounded-xl border border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all group pointer-events-auto"
                                style={{ contain: 'content' }}
                            >
                                <div className="flex-1">
                                    {/* Backend User reference se name fetch ho raha hai */}
                                    <p className="text-xs font-bold text-slate-900 dark:text-slate-200 truncate">{item.studentId?.fullName || "Student"}</p>
                                    <p className="text-[10px] text-slate-400 md:hidden mt-0.5">Std {item.standard}</p>
                                </div>
                                <div className="flex-1 hidden md:block">
                                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Total Qs: {item.totalMarks}</span>
                                </div>
                                <div className="w-20 text-center">
                                    <span className={`text-xs font-bold ${item.status === 'Pass' ? 'text-blue-600' : 'text-red-500'}`}>
                                        {item.score}
                                    </span>
                                </div>
                                <div className="w-24 flex justify-end">
                                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                        item.status === 'Pass' 
                                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600' 
                                        : 'bg-red-50 dark:bg-red-500/10 text-red-500'
                                    }`}>
                                        {item.status === 'Pass' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                        {item.status}
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="p-10 text-center text-[10px] font-bold text-slate-400 uppercase">No Submissions Found</div>
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Pending (Absent Students from Backend) */}
            <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-600">
                        <UserMinus size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">Missing Submissions</h3>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Pending Exams ({absentList.length})</p>
                    </div>
                </div>

                <div className="space-y-4 flex-1 overflow-y-auto custom-scroll">
                    {absentList.length > 0 ? absentList.map((student) => (
                        <div key={student._id} 
                            className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 group hover:border-blue-500/30 transition-all transform-gpu"
                            style={{ contain: 'layout' }}
                        >
                            <div className="min-w-0 pr-2">
                                <p className="text-xs font-bold text-slate-900 dark:text-slate-200 truncate">{student.fullName}</p>
                                <p className="text-[10px] font-medium text-slate-400 mt-0.5 truncate">{student.email}</p>
                            </div>
                            <button className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold uppercase transition-all active:scale-95 shadow-lg shadow-blue-600/10">
                                <Bell size={10} />
                                Remind
                            </button>
                        </div>
                    )) : (
                        <div className="p-10 text-center text-[10px] font-bold text-slate-400 uppercase">All students attended!</div>
                    )}
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800">
                    <button className="w-full py-2.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
                        Sync Absent Records
                    </button>
                </div>
            </div>

        </div>
    );
});

RecentResults.displayName = 'RecentResults';
export default RecentResults;