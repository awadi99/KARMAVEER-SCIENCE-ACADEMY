import React, { useState, useMemo } from "react";
import { Images, BookOpen, School, Award } from "lucide-react";

// 🚀 Clean imports using your exact configurations
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../../constants/galleryData.js';
import GalleryModal from "./GalleryModal"; 

const iconMap = {
    Images: Images,
    School: School,
    BookOpen: BookOpen,
    Award: Award
};

export default function Gallery() {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedItem, setSelectedItem] = useState(null); // Simple reference identity link

    // High performance filters optimized via useMemo reference blocks
    const filteredItems = useMemo(() => {
        if (activeTab === "all") return GALLERY_ITEMS;
        return GALLERY_ITEMS.filter(item => item.category === activeTab);
    }, [activeTab]);

    return (
        <section 
            id="gallery"
            className="w-full bg-[#F8FAFC] dark:bg-[#0F172A] py-16 sm:py-24 border-t border-slate-200/40 dark:border-white/5 transition-colors duration-300"
            style={{ contain: 'content', contentVisibility: 'auto' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 🎯 Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/40 border border-blue-200/40 dark:border-blue-900/40 rounded-full mb-4">
                        <Images size={14} className="text-[#2563EB] dark:text-[#3B82F6]" />
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6]">
                            Campus Tour
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-[#F1F5F9] tracking-tight mb-4">
                        Explore Karmaveer Infrastructure
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                        Click on any facility card below to view the full image layout along with comprehensive academic operational records.
                    </p>
                </div>

                {/* 🎛️ Navigation Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 select-none">
                    {GALLERY_CATEGORIES.map((tab) => {
                        const Icon = iconMap[tab.icon] || Images; 
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all active:scale-95 border touch-manipulation ${
                                    isActive
                                        ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/10"
                                        : " text-slate-600 dark:text-[#94A3B8] border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
                                }`}
                            >
                                <Icon size={16} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* 🖼️ Grid Layout System - Clean DOM loops */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transform-gpu">
                    {filteredItems.map((item) => (
                        <article 
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="group relative  rounded-2xl overflow-hidden border border-slate-200/60 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 will-change-transform transform-gpu cursor-pointer"
                        >
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover object-center transform-gpu transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>

                            <div className="p-5 bg-[#F8FAFC] dark:bg-[#242c3f]">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#2563EB] dark:text-[#3B82F6] bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
                                    {item.category}
                                </span>
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F1F5F9] mt-3 tracking-tight group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-2 leading-relaxed line-clamp-2">
                                    {item.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

            </div>

            {/* 🚪 Conditional Mounting Strategy: Unlinks modal computational lifecycle from parent runtime */}
            {selectedItem && (
                <GalleryModal 
                    item={selectedItem} 
                    onClose={() => setSelectedItem(null)} 
                />
            )}
        </section>
    );
}