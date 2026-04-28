import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "./navItems";

const MenuItem = memo(({ item, expanded }) => {
    const Icon = item.icon;

    return (
        <NavLink
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) => `
                flex items-center justify-between px-3 py-2 rounded-lg 
                group select-none transition-colors duration-200 transform-gpu
                ${item.danger
                    ? "text-slate-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600"
                    : isActive
                        ? "text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                }
            `}
            style={{ willChange: 'transform' }}
        >
            {/* FIX: NavLink provides a render prop for children. 
               We destructure { isActive } here so it's available for the Icon and Badge.
            */}
            {({ isActive }) => (
                <>
                    <div className="flex items-center gap-3 z-10">
                        <Icon 
                            className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                                isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400'
                            }`} 
                            strokeWidth={isActive ? 2.5 : 2} 
                        />
                        
                        {expanded && (
                            <span className="text-[13.5px] font-medium tracking-normal">
                                {item.name}
                            </span>
                        )}
                    </div>

                    {(item.badge || item.badges) && expanded && (
                        <div className={`
                            text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors
                            ${isActive
                                ? "bg-blue-600 text-white"
                                : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}
                        `}>
                            {item.badge || item.badges}
                        </div>
                    )}
                </>
            )}
        </NavLink>
    );
});

MenuItem.displayName = "MenuItem";

export default function SidebarMenu({ expanded }) {
    return (
        <nav 
            className="flex flex-col p-3 gap-1 mt-4" 
            style={{ 
                contain: 'layout paint',
                WebkitFontSmoothing: 'antialiased'
            }}
        >
            {navItems.map((item) => (
                <MenuItem key={item.name} item={item} expanded={expanded} />
            ))}
        </nav>
    );
}