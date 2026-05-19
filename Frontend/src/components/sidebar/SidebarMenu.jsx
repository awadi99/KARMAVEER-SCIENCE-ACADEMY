import React, { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "./navItems";
import { useAuth } from "../../hook/useAuth";

// 1. MenuItem Component: Sidebar ke har individual button ke liye
const MenuItem = memo(({ item, expanded, onLogout, isLoggingOut }) => {
    const Icon = item.icon;

    const content = (isActive) => (
        <div className="flex items-center gap-3 z-10 w-full">
            <Icon 
                className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                    isActive ? 'text-blue-700 dark:text-blue-400' : 'text-slate-400'
                }`} 
                strokeWidth={isActive ? 2.5 : 2} 
            />
            {expanded && (
                <span className="text-[13.5px] font-medium tracking-normal flex-1">
                    {isLoggingOut && item.name === "Logout" ? "Logging out..." : item.name}
                </span>
            )}
            {(item.badge || item.badges) && expanded && (
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                    isActive ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}>
                    {item.badge || item.badges}
                </div>
            )}
        </div>
    );

    // Logout Button Special Case
    if (item.name === "Logout") {
        return (
            <button
                onClick={onLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg group select-none transition-colors duration-200 text-slate-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 disabled:opacity-50"
            >
                {content(false)}
            </button>
        );
    }

    // Standard Navigation Item
    return (
        <NavLink
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) => `
                flex items-center justify-between px-3 py-2 rounded-lg group select-none transition-colors duration-200
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

// 2. SidebarMenu Component: Main Menu container
export default function SidebarMenu({ expanded }) {
    const { user, logout, isLoggingOut } = useAuth();

    // Roles ke hisaab se menu filter karo
    const filteredNavItems = useMemo(() => {
        if (!user) return [];
        return navItems.filter((item) => item.roles?.includes(user?.role));
    }, [user?.role]);

    const handleLogout = async () => {
        if (isLoggingOut) return;
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
                    isLoggingOut={isLoggingOut}
                />
            ))}
        </nav>
    );
}