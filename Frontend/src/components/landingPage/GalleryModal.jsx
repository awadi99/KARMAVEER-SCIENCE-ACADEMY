import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, BookOpen } from "lucide-react";

export default function GalleryModal({ item, onClose }) {
    

    useEffect(() => {
  
        const scrollY = window.scrollY;
        const originalStyle = window.getComputedStyle(document.body).overflow;
        
        document.body.style.overflow = "hidden";
        
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        
        return () => {
            document.body.style.overflow = originalStyle;
            window.removeEventListener("keydown", handleKeyDown);
            
            window.scrollTo(0, scrollY);
        };
    }, [onClose]);


    const modalRoot = document.body;

    const modalContent = (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 md:p-6 select-none pointer-events-auto">
            
            
            <div 
                className="absolute inset-0 bg-slate-900/80 dark:bg-black/85 transition-opacity duration-150 ease-out transform-gpu"
                onClick={onClose} 
            />

            
            <div className="bg-white dark:bg-[#0B0F19] w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800/60 relative z-10 flex flex-col md:flex-row max-h-[85vh] sm:max-h-[90vh] md:max-h-[80vh] transform-gpu will-change-transform scale-100 transition-transform duration-200">
                
                
                <button
                    onClick={onClose}
                    className="absolute top-2.5 right-2.5 md:top-4 md:right-4 z-30 bg-slate-900/60 backdrop-blur-md text-white md:bg-slate-100 md:dark:bg-slate-800 md:text-slate-700 md:dark:text-slate-300 p-2 rounded-full hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all active:scale-90 shadow-md touch-manipulation"
                    aria-label="Close institutional view"
                >
                    <X size={15} className="sm:w-4 sm:h-4" />
                </button>


                <div className="w-full md:w-1/2 bg-slate-100 dark:bg-[#070A12] flex items-center justify-center relative h-[180px] sm:h-[240px] md:h-auto overflow-hidden border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800/40 shrink-0">
                    <img
                        src={item.image}
                        alt={item.title}
                        decoding="async"
                        loading="eager"
                        className="w-full h-full object-cover object-center transform-gpu pointer-events-none"
                    />
                </div>

                
                <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-7 flex flex-col justify-between overflow-y-auto bg-white dark:bg-[#0B0F19] scrollbar-thin">
                    
                    <div className="flex flex-col">
                        {/* Institutional Badge Profile Layout */}
                        <div className="inline-flex items-center gap-1.5 self-start px-2 py-0.5 sm:px-2.5 sm:py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md border border-slate-200 dark:border-slate-700">
                            <BookOpen size={10} className="text-[#1E3A8A] dark:text-[#3B82F6] sm:w-3 sm:h-3" />
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                                {item.category} Registry
                            </span>
                        </div>
                        
                        
                        <h3 className="text-base sm:text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-2.5 sm:mt-3.5 leading-tight">
                            {item.title}
                        </h3>


                        <div className="h-px bg-slate-200 dark:bg-slate-800 my-2.5 sm:my-3.5" />

                        
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-300 leading-relaxed mb-2 sm:mb-3">
                            {item.description}
                        </p>

                        
                        <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed font-normal">
                            {item.detailedInfo}
                        </p>
                    </div>

                    
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/40 hidden sm:block shrink-0">
                        <p className="text-[8px] md:text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                            Karmaveer Science Academy • Facility Record
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );

    return createPortal(modalContent, modalRoot);
}