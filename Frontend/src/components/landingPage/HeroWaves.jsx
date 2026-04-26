import React from 'react';

export default function HeroWaves() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
      <svg
        className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px]"
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
          {/* Wave 1: Slowest & Most Transparent */}
          <use
            href="#gentle-wave"
            x="48"
            y="0"
            className="fill-indigo-500/10 dark:fill-violet-500/5 animate-wave-slow"
          />
          {/* Wave 2: Medium Speed */}
          <use
            href="#gentle-wave"
            x="48"
            y="3"
            className="fill-indigo-500/20 dark:fill-violet-500/10 animate-wave-med"
          />
          {/* Wave 3: Fastest & Matches the Section Background */}
          <use
            href="#gentle-wave"
            x="48"
            y="5"
            className="fill-[#fafafa] dark:fill-[#030303] animate-wave-fast"
          />
        </g>
      </svg>
    </div>
  );
}