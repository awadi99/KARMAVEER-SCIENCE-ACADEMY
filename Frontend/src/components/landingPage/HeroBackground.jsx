import React from "react";
import herobg from '../../assets/website/hero_bg.jpeg';


const HeroBackground = React.memo(() => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
            
            
            <img
                src={herobg}
                alt=""
                fetchPriority="high" 
                className="w-full h-full object-cover object-center transform-gpu"
                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
            />


            <div className="absolute inset-0 hidden dark:block bg-gradient-to-b from-[#0F172A]/75 via-[#0F172A]/85 to-[#0F172A]" />
            <div className="absolute inset-0 dark:hidden bg-gradient-to-b from-[#F9FAFB]/70 via-[#F9FAFB]/80 to-[#F9FAFB]" />

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 dark:via-blue-500/40 to-transparent" />
        </div>
    );
});

HeroBackground.displayName = 'HeroBackground';
export default HeroBackground;