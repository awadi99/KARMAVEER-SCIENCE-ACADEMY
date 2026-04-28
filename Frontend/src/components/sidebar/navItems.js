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
    },
    {
        name: "Students",
        path: "/dashboard/students",
        icon: Users,
    },
    {
        name: "Tests",
        path: "/dashboard/tests",
        icon: FileText,
    },

    {
        name: "Fees",
        path: "/dashboard/fees",
        icon: IndianRupee ,
    },

    {
        name: "Profile",
        path: "/dashboard/profile",
        icon: User,
    },

    {
        name: "Logout",
        path: "/dashboard/Logout",
        icon: LogOut,
        danger:true
    },

];