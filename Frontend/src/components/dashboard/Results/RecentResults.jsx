import React, { memo, useMemo } from 'react';
import { 
    CheckCircle2, AlertCircle, Bell, UserMinus, 
    User as UserIcon, Search, Mail, Fingerprint,
    ExternalLink
} from 'lucide-react';

// Memoized individual row to prevent unnecessary re-renders of the whole list
const StudentRow = memo(({ item }) => (
    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:shadow-sm dark:hover:bg-slate-800/40 transition-all group">
        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
            {item.studentId?.profilePic ? (
                <img src={item.studentId.profilePic} alt="" className="h-full w-full object-cover" loading="lazy" />
            ) : <UserIcon size={16} className="text-slate-400" />}
        </div>

        <div className="flex-1 min-w-0">
            <h4 className="text-[13px] sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 transition-colors">
                {item.studentId?.fullName || 'Student'}
            </h4>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[10px] sm:text-[11px] mt-0.5">
                <span className="flex items-center gap-1 truncate max-w-[120px] sm:max-w-none">
                    <Mail size={12} className="shrink-0"/> {item.studentId?.email}
                </span>
                <span className="hidden md:inline-block text-slate-300 dark:text-slate-700">•</span>
                <span className="hidden md:flex items-center gap-1 font-mono uppercase tracking-tighter">
                    <Fingerprint size={12}/> {item.studentId?.erpId}
                </span>
            </div>
        </div>

        <div className="shrink-0 text-right pr-1 sm:pr-2">
            <div className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 sm:mb-1">Score</div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                {item.score} <span className="text-slate-400 dark:text-slate-500 font-normal">/{item.totalMarks}</span>
            </div>
        </div>

        <div className="shrink-0">
            <div className={`px-2 sm:px-3 py-1 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-wide border ${
                item.status === 'Pass' 
                ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' 
                : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'
            }`}>
                {item.status}
            </div>
        </div>
    </div>
));

const RecentResults = memo(({ presentList = [], absentList = [] }) => {
    
    // Memory Optimization: Lists only re-calculate if data props change
    const presentItems = useMemo(() => 
        presentList.map((item) => <StudentRow key={item._id} item={item} />),
    [presentList]);

    const absentItems = useMemo(() => 
        absentList.map((student) => (
            <div key={student._id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 transition-all hover:border-blue-200 dark:hover:border-blue-900/40">
                <div className="min-w-0 pr-2">
                    <p className="text-[12px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{student.fullName}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-500 truncate lowercase font-medium">{student.email}</p>
                </div>
                <button className="h-8 w-8 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-slate-400 hover:text-blue-600 transition-all active:scale-90 flex items-center justify-center shrink-0">
                    <Bell size={14} />
                </button>
            </div>
        )), 
    [absentList]);

    return (
        <div className="w-full flex flex-col xl:flex-row gap-6 sm:gap-8 mt-6 sm:mt-10 px-2 sm:px-0">
            {/* 🟦 ACADEMIC SUBMISSIONS (Main Scroll Container) */}
            <section className="flex-[2] bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[500px] sm:h-[650px] overflow-hidden">
                <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900/40 sticky top-0 z-10">
                    <div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">Submission Overview</h3>
                        <p className="hidden sm:block text-xs text-slate-500 mt-1">Real-time status of student assessment completions.</p>
                    </div>
                    <div className="flex items-center gap-2 py-1 px-3 bg-blue-50 dark:bg-blue-500/10 rounded-full border border-blue-100 dark:border-blue-900/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                        <span className="text-[10px] sm:text-xs font-bold text-blue-700 dark:text-blue-400">{presentList.length} Completed</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 custom-scrollbar bg-slate-50/20 dark:bg-transparent overscroll-contain">
                    {presentList.length > 0 ? presentItems : <EmptyState message="No academic records found for this test." />}
                </div>
            </section>

            {/* 🟧 ATTENDANCE PENDING (Side Scroll Container) */}
            <section className="flex-1 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[500px] sm:h-[650px] overflow-hidden">
                <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/60 sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <UserMinus size={16} className="text-slate-400" />
                        <h3 className="text-[13px] sm:text-sm font-bold text-slate-800 dark:text-white">Absentees</h3>
                    </div>
                    <span className="text-[10px] font-bold text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-2 py-0.5 rounded uppercase tracking-wider">{absentList.length} Pending</span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 custom-scrollbar overscroll-contain bg-white dark:bg-transparent">
                    {absentList.length > 0 ? absentItems : <EmptyState message="Full attendance recorded." icon={<CheckCircle2 className="text-green-500" />} />}
                </div>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/40">
                    <button className="w-full py-2.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wide">
                        Send Reminders <ExternalLink size={12}/>
                    </button>
                </div>
            </section>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { 
                    background: #e2e8f0; 
                    border-radius: 20px; 
                }
                :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
                :global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
                
                @media (max-width: 640px) {
                    .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                }
            `}</style>
        </div>
    );
});

const EmptyState = ({ message, icon }) => (
    <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
        <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-full mb-3 shadow-inner">
            {icon || <Search size={24} className="text-slate-300" />}
        </div>
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 max-w-[200px] leading-relaxed">{message}</p>
    </div>
);

export default RecentResults;