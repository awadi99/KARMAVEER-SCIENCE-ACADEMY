import React from 'react';
import { UserCircle, ShieldCheck } from 'lucide-react';
import ProfileHero from '../components/profile/ProfileHero';
import ERPVerifyCard from '../components/profile/ERPVerifyCard';
import AcademicUpdateCard from '../components/profile/AcademicUpdateCard';
import { useAuth } from '../hook/useAuth';

export default function ProfilePage() {
    // 🔥 FIX: 'isError' ko yahan nikaalna zaroori hai
    const { user, isLoading, isError } = useAuth(); 

    // 1. Loading State: Ultra-smooth UI
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-[#020205]">
                <div className="relative flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                    <div className="absolute inset-0 m-auto h-6 w-6 bg-blue-600/20 rounded-full animate-pulse"></div>
                </div>
            </div>
        );
    }

    // 2. Error State: Redirect or Message
    if (isError || !user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <p className="text-slate-500 font-medium tracking-tight">Session expired or data missing.</p>
                <button 
                    onClick={() => window.location.href = '/login'}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20"
                >
                    Login Again
                </button>
            </div>
        );
    }

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
                            {user.role} profile
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                        {user.role ? `Verified ${user.role}` : `Verified User`}
                    </span>
                </div>
            </div>

            {/* Content Divider */}
            <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />

            {/* Profile Content Section */}
            <div className="space-y-8 transform-gpu">
                <ProfileHero user={user}/>
                
                {/* 🛡️ Dynamic Card Rendering */}
                <div className="w-full">
                    {user.role === 'student' ? (
                        <AcademicUpdateCard user={user} />
                    ) : (
                        <ERPVerifyCard user={user} />
                    )}
                </div>
            </div>
        </div>
    );
}