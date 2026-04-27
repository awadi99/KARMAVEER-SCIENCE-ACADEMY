import React from 'react';

const HeroWaves = () => {
  return (
    <div className="hero-wave-container">
      <svg
        className="relative w-full h-[40px] md:h-[80px] min-h-[40px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="parallax">
          {/* Layer 1: Farthest back - very subtle blue */}
          <use
            href="#gentle-wave"
            x="48"
            y="0"
            className="animate-wave-slow fill-[#2563EB]/5 dark:fill-[#3B82F6]/5"
          />
          {/* Layer 2: Middle - slightly more visible */}
          <use
            href="#gentle-wave"
            x="48"
            y="3"
            className="animate-wave-med fill-[#2563EB]/15 dark:fill-[#3B82F6]/10"
          />
          {/* Layer 3: Front - main brand blue at low opacity */}
          <use
            href="#gentle-wave"
            x="48"
            y="5"
            className="animate-wave-fast fill-[#2563EB]/25 dark:fill-[#3B82F6]/15"
          />
          {/* Layer 4: SOLID BASE 
              This MUST match the background of the section BELOW the hero.
          */}
          <use
            href="#gentle-wave"
            x="48"
            y="7"
            className="fill-[#F9FAFB] dark:fill-[#0F172A]"
          />
        </g>
      </svg>
    </div>
  );
};

export default HeroWaves;