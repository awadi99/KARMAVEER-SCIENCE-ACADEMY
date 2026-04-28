import { FileText, Plus, Search } from 'lucide-react'
import React, { memo } from 'react'
import SubjectGrid from '../components/test/SubjectGrid'

export default function TestPage() {
    return (
        <div className="min-h-screen bg-slate-50/30 dark:bg-[#0B0F1A]">
            {/* 1. PERFORMANCE: 'isolate' prevents z-index fighting. 
                'max-w-7xl' ensures it doesn't look stretched on ultra-wide monitors.
            */}
            <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto isolate">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        {/* Visual Anchor: Removed heavy shadow-blue for a cleaner academic look */}
                        <div className="hidden sm:flex h-12 w-12 rounded-xl bg-blue-600 items-center justify-center text-white shadow-md transform-gpu">
                            <FileText size={22} strokeWidth={2.5} />
                        </div>

                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] leading-none">
                                Admin Control Panel
                            </p>
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                Subject Tests
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Content Divider */}
                <div className="h-px w-full bg-slate-200 dark:bg-slate-800/50" />

                {/* 3. PERFORMANCE OPTIMIZATION: 
                    'contain-layout-paint' isolates the grid.
                    If the grid has 50 subjects, the Header won't lag.
                */}
                <div 
                    className="transform-gpu" 
                    style={{ 
                        contain: 'layout paint',
                        contentVisibility: 'auto' // Only renders the grid when it enters the viewport
                    }}
                >
                    <SubjectGrid />
                </div>
            </div>
        </div>
    )
}