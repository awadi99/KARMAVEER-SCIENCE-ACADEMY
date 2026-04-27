import { memo } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "./navItems";

const MenuItem = memo(({ item, expanded }) => {
    const Icon = item.icon;

    return (
        <NavLink
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) => `
                flex items-center justify-between px-4 py-2.5 rounded-xl 
                group relative select-none
                /* NO ANIMATION: Pure state-based styling */
                ${item.danger
                    ? "text-slate-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600"
                    : isActive
                        ? "text-white bg-indigo-600 shadow-md"
                        : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/[0.03] dark:hover:text-white"
                }
            `}
        >
            <div className="flex items-center gap-3 z-10">
                <Icon className="w-5 h-5" />
                {expanded && (
                    <span className="text-[11px] font-black uppercase tracking-wider">
                        {item.name}
                    </span>
                )}
            </div>

            {(item.badge || item.badges) && expanded && (
                <div className={`
                    z-10 text-[9px] font-black px-2 py-0.5 rounded-md
                    ${isActive
                        ? "bg-white/20 text-white"
                        : "bg-indigo-50 text-indigo-600 dark:bg-white/5 dark:text-slate-400"}
                `}>
                    {item.badge || item.badges}
                </div>
            )}
        </NavLink>
    );
});

MenuItem.displayName = "MenuItem";

export default function SidebarMenu({ expanded }) {
    return (
        <nav className="flex flex-col p-2 gap-1 mt-2">
            {navItems.map((item) => (
                <MenuItem key={item.name} item={item} expanded={expanded} />
            ))}
        </nav>
    );
}