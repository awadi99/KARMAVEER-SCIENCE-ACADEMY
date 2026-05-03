import React, { memo, use } from 'react';
import { User, Mail, Hash, ShieldCheck, GraduationCap, Layers } from 'lucide-react';

const ProfileHero = memo(({ user }) => {
    // Optimization: Pre-calculating values to avoid logic inside JSX
    const name = user?.fullName || "User Name";
    const erp = user?.erpId || "N/A";
    const email = user?.email || "No Email Provided";
    const role = user?.role || "student";
    const standard = user?.standard;
    const stream = user?.stream;
    const profilePic = user?.profilePic || user?.image || "";
    return (
        <div className="relative rounded-[2rem] sm:rounded-[3rem] bg-slate-900 dark:bg-slate-950 p-6 md:p-12 overflow-hidden shadow-2xl border border-slate-800 transform-gpu">

            {/* Optimized Background Glows - Using opacity for performance */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">

                {/* Profile Picture Section - Optimized for Images */}
                <div className="shrink-0 h-28 w-28 md:h-36 md:w-36 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 p-1 shadow-2xl">
                    <div className="h-full w-full rounded-[1.8rem] md:rounded-[2.3rem] bg-slate-900 flex items-center justify-center overflow-hidden relative">
                        {profilePic ? (
                            <img
                                src={profilePic}
                                alt={name}
                                className="h-full w-full object-cover transition-opacity duration-300"
                                onLoad={(e) => e.target.classList.add('opacity-100')}
                                onError={(e) => {
                                    console.error("Image load failed");
                                    e.target.src = "https://ui-avatars.com/api/?name=" + name; // Fallback Avatar
                                }}
                            />
                        ) : (
                            <User size={50} className="text-white/20" strokeWidth={1.5} />
                        )}
                    </div>
                </div>

                {/* Content Section - Improved Responsiveness */}
                <div className="text-center md:text-left space-y-4 w-full">
                    <div className="space-y-1.5">
                        <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-2 md:gap-4">
                            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter capitalize leading-tight">
                                {name}
                            </h2>
                            {/* Role Badge - Compact for Mobile */}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest self-center md:self-auto">
                                <ShieldCheck size={12} /> {role}
                            </span>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-slate-400 text-xs md:text-sm font-medium">
                            <span className="flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-none">
                                <Mail size={14} className="text-blue-500 shrink-0" /> {email}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Hash size={14} className="text-indigo-500 shrink-0" /> {erp}
                            </span>
                        </div>
                    </div>

                    {/* Academic Status - Optimized Grid for Mobile */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                        {user.role === 'student' && (
                            <div className="flex items-center gap-2">
                                {standard ? (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                                        <GraduationCap size={16} className="text-emerald-400" />
                                        <span className="text-[11px] md:text-xs font-bold text-white tracking-wide">
                                            Class {standard}th
                                        </span>
                                    </div>
                                ) : (
                                    <div className="px-4 py-2 bg-rose-500/10 rounded-xl border border-rose-500/20 animate-pulse">
                                        <span className="text-[10px] font-black text-rose-400 uppercase tracking-tighter">
                                            Class Not Set
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Admin ke liye hum yahan kuch alag badge dikha sakte hain (Optional) */}
                        {user.role === 'admin' && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <ShieldCheck size={16} className="text-blue-400" />
                                <span className="text-[11px] md:text-xs font-bold text-white tracking-wide">
                                    System Administrator
                                </span>
                            </div>
                        )}
                        {stream && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                                <Layers size={16} className="text-indigo-400" />
                                <span className="text-[11px] md:text-xs font-bold text-white uppercase tracking-wider">{stream}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProfileHero;