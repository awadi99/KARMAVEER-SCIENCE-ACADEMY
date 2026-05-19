import React, { useState, useEffect, useRef } from "react";
import { One, Two, Three, Four, Five } from '../../assets/website/ressults/index.js';

const ARR_ACHIEVEMENTS = [One, Two, Three, Four, Five];

export default function AchievementSlider() {
    const [curSlide, setCurSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const accumulatedDelta = useRef(0);
    const touchStart = useRef(0);
    const animSpd = 500; // Thoda fast, more responsive feel

    const navigate = (direction) => {
        if (isAnimating) return;
        const nextSlide = curSlide + direction;
        if (nextSlide >= 0 && nextSlide < ARR_ACHIEVEMENTS.length) {
            setIsAnimating(true);
            setCurSlide(nextSlide);
            setTimeout(() => setIsAnimating(false), animSpd);
        }
    };

    // Mobile Swipe & Mouse Wheel Handlers
    useEffect(() => {
        const slider = document.getElementById("responsive-image-slider-root");
        
        const handleWheel = (e) => {
            accumulatedDelta.current += e.deltaY;
            if (Math.abs(accumulatedDelta.current) >= 80) {
                navigate(accumulatedDelta.current > 0 ? 1 : -1);
                accumulatedDelta.current = 0;
            }
        };

        const handleTouchStart = (e) => (touchStart.current = e.touches[0].clientX);
        const handleTouchEnd = (e) => {
            const diff = touchStart.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
        };

        if (slider) {
            slider.addEventListener("wheel", handleWheel, { passive: true });
            slider.addEventListener("touchstart", handleTouchStart);
            slider.addEventListener("touchend", handleTouchEnd);
        }
        return () => {
            slider?.removeEventListener("wheel", handleWheel);
            slider?.removeEventListener("touchstart", handleTouchStart);
            slider?.removeEventListener("touchend", handleTouchEnd);
        };
    }, [curSlide, isAnimating]);

    return (
        <div className="w-full bg-[#F9FAFB] dark:bg-[#0F172A] py-8 transition-colors duration-300">
            <div className="w-full max-w-[1500px] mx-auto px-4">
                <div 
                    id="responsive-image-slider-root"
                    // DYNAMIC ASPECT RATIO: Mobile par 4/3, Tablet/Desktop par 21/9
                    className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden  shadow-2xl border border-slate-700 select-none cursor-grab active:cursor-grabbing"
                >
                    <div 
                        className="flex w-full h-full transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${curSlide * 100}%)` }}
                    >
                        {ARR_ACHIEVEMENTS.map((imgAsset, index) => (
                            <div key={index} className="w-full h-full flex-shrink-0 flex items-center justify-center p-2">
                                <div 
                                    className="w-full h-full bg-center bg-contain bg-no-repeat"
                                    style={{ backgroundImage: `url(${imgAsset})` }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full flex gap-2">
                        {ARR_ACHIEVEMENTS.map((_, index) => (
                            <button 
                                key={index}
                                onClick={() => !isAnimating && setCurSlide(index)}
                                className={`h-2 transition-all duration-300 rounded-full ${
                                    index === curSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}