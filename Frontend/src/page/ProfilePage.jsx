import React from 'react';
import { UserCircle, ShieldCheck } from 'lucide-react';
import ProfileHero from '../components/profile/ProfileHero';
import ERPVerifyCard from '../components/profile/ERPVerifyCard';

export default function ProfilePage() {
    return (
        <div className="p-4 sm:p-6 space-y-8 max-w-7xl mx-auto isolate min-h-screen">
            
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 transform-gpu">
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex h-12 w-12 rounded-2xl bg-blue-600 items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <UserCircle size={24} />
                    </div>
                    
                    <div className="space-y-0.5">
                        <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest leading-none">
                            Administrative Identity
                        </p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                            User Profile
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Verified Admin</span>
                </div>
            </div>

            {/* Content Divider */}
            <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />

            {/* Profile Content Section */}
            <div className="space-y-8 transform-gpu" style={{ contain: 'layout' }}>
                {/* ProfileHero remains top-aligned */}
                <ProfileHero />
                
                {/* Full Width ERP Verify Card */}
                <div className="w-full">
                    <ERPVerifyCard />
                </div>
            </div>
        </div>
    );
}