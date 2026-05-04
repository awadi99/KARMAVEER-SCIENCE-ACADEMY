import {
    LayoutDashboard,
    
    User,
    LogOut,
    Users,
    FileText,
    BookOpenCheck,
    IndianRupee,

} from "lucide-react";


export const navItems = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
        roles: ["admin"], 
    },
    {
        name: "Students",
        path: "/dashboard/students",
        icon: Users,
        roles: ["admin"], 
    },
    {
        name: "Tests",
        path: "/dashboard/tests",
        icon: FileText,
        roles: ["admin", "student"], 
    },

    {
        name: "Profile",
        path: "/dashboard/profile",
        icon: User,
        roles: ["admin", "student"], 
    },
    {
        name: "Logout",
        path: "/dashboard/Logout",
        icon: LogOut,
        danger: true,
        roles: ["admin", "student"],
    },
];