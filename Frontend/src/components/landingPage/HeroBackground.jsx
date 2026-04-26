import React from "react";
import herobg from '../../assets/herobg.png';

export default function HeroBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            
            <div className="absolute inset-0 hidden dark:block transition-opacity duration-700">
                <img
                    src={herobg}
                    alt="Academy Background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            
            <div className="absolute inset-0 dark:hidden opacity-40 transition-opacity duration-700">
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>

            
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 dark:via-violet-500/50 to-transparent" />
        </div>
    );
}