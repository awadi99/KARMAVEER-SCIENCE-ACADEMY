import { Users, BookOpen, IndianRupee, CheckCircle2 } from "lucide-react";

const CardData = [
    { 
        id: 1,
        title: "Total Students", 
        value: "32", 
        Icon: Users, 
        
        color: "text-indigo-600 dark:text-violet-400", 
        bg_color: "bg-indigo-50 dark:bg-violet-500/10",
        border: "border-indigo-100 dark:border-violet-500/20",
        glow: "shadow-indigo-200/50 dark:shadow-violet-500/20"
    },
    { 
        id: 2,
        title: "Tests Conducted", 
        value: "18", 
        Icon: BookOpen, 
        // WHITE MODE: Deep Violet | DARK MODE: Soft Fuchsia
        color: "text-violet-600 dark:text-fuchsia-400", 
        bg_color: "bg-violet-50 dark:bg-fuchsia-500/10",
        border: "border-violet-100 dark:border-fuchsia-500/20",
        glow: "shadow-violet-200/50 dark:shadow-fuchsia-500/20"
    },

    { 
        id: 4,
        title: "Today's Attendance", 
        value: "92%", // Fixed the value to look like percentage
        Icon: CheckCircle2, 
        // WHITE MODE: Blue | DARK MODE: Cyan/Sky
        color: "text-blue-600 dark:text-sky-400", 
        bg_color: "bg-blue-50 dark:bg-sky-500/10",
        border: "border-blue-100 dark:border-sky-500/20",
        glow: "shadow-blue-200/50 dark:shadow-sky-500/20"
    },
];

export default CardData;