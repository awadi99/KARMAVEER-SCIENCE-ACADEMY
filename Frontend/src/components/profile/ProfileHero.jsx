import React, { memo } from 'react';
import { User, Mail, Globe } from 'lucide-react';

const ProfileHero = memo(() => (
    <div className="relative rounded-[3rem] bg-slate-900 dark:bg-slate-950 p-8 md:p-12 overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="h-32 w-32 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 p-1">
                <div className="h-full w-full rounded-[2.3rem] bg-slate-900 flex items-center justify-center">
                    <User size={60} className="text-white/20" strokeWidth={1.5} />
                </div>
            </div>
            
            <div className="text-center md:text-left space-y-2">
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">Arjun Mehta</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-blue-200/60 text-sm font-bold uppercase tracking-tight">
                    <span className="flex items-center gap-1.5"><Mail size={14}/> arjun.dev@erp.com</span>
                    <span className="flex items-center gap-1.5"><Globe size={14}/> Web Architect</span>
                </div>
            </div>
        </div>
    </div>
));

export default ProfileHero;