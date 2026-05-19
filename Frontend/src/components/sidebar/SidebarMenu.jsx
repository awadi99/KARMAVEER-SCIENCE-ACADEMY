import React, { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "./navItems";
import { useAuth } from "../../hook/useAuth";

const MenuItem = memo(({ item, expanded, onLogout }) => {
    const Icon = item.icon;

    const content = (isActive) => (
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
    );

    if (item.name === "Logout") {
        return (
            <button
                onClick={onLogout}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg group select-none transition-colors duration-200 text-slate-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600"
            >
                {content(false)}
            </button>
        );
    }

    return (
        <NavLink
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) => `
                flex items-center justify-between px-3 py-2 rounded-lg 
                group select-none transition-colors duration-200
                ${item.danger
                    ? "text-slate-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600"
                    : isActive
                        ? "text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                }
            `}
        >
            {({ isActive }) => content(isActive)}
        </NavLink>
    );
});

MenuItem.displayName = "MenuItem";

export default function SidebarMenu({ expanded }) {
    const { user, logout } = useAuth();

    const filteredNavItems = useMemo(() => {
        // Safe check: Agar user nahi hai toh items filter mat karo ya empty array rakho
        if (!user) return [];
        return navItems.filter((item) => item.roles?.includes(user?.role));
    }, [user?.role]);

    const handleLogout = async () => {
        // Direct logout without unnecessary state complications
        await logout();
    };

    return (
        <nav className="flex flex-col p-3 gap-1 mt-4">
            {filteredNavItems.map((item) => (
                <MenuItem 
                    key={item.name} 
                    item={item} 
                    expanded={expanded} 
                    onLogout={handleLogout}
                />
            ))}
        </nav>
    );
}