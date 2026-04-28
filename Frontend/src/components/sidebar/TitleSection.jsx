import React from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';

export const TitleSection = ({ open, title = "Course Overview", subtitle = "Section 1.2" }) => {
  return (
    /* - border-slate-200: Soft, clean academic lines.
       - bg-white: Clean paper-like feel.
    */
    <div className='mb-6 border-b border-slate-200 pb-4'>
      <div
        className='flex cursor-pointer items-center justify-between
        rounded-xl p-2 transition-all duration-200 hover:bg-slate-50 group'
      >
        <div className='flex items-center gap-4'>
          {/* Icon Container: Professional Blue accent common in EDU sites */}
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'>
            <BookOpen size={20} strokeWidth={2.5} />
          </div>

          <div className='flex flex-col'>
            {/* Subtitle/Breadcrumb: Small, uppercase, and tracking-widest */}
            <span className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
              {subtitle}
            </span>
            {/* Main Title: font-bold (not black) and tracking-tight */}
            <h2 className='text-lg font-bold text-slate-800 dark:text-slate-100'>
              {title}
            </h2>
          </div>
        </div>

        {/* - transform-gpu: Ensures smooth rotation without lag.
           - transition-transform: Animates the state change.
        */}
        <div className={`text-slate-400 transition-transform duration-300 transform-gpu ${open ? 'rotate-90' : 'rotate-0'}`}>
          <ChevronRight size={20} />
        </div>
      </div>
      
      {/* Visual Indicator: A subtle accent common in Education Dashboards */}
      <div className='mt-2 h-0.5 w-8 rounded-full bg-blue-600' />
    </div>
  );
};