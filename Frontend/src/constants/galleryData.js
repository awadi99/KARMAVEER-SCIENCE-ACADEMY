// 📦 Importing your local asset variables exactly as structured
import {
    class1,
    class1_1,
    class1_2,
    class2,
    class2_1,
    class2_2,
    inter,
    Library,
    Library2,
    Library3,
    whiteboard
} from '../assets/website/index.js';

export const GALLERY_CATEGORIES = [
    { id: "all", label: "All Campus", icon: "Images" },
    { id: "class", label: "Classrooms", icon: "School" },
    { id: "library", label: "Central Library", icon: "BookOpen" },
    { id: "infrastructure", label: "Campus & Utilities", icon: "Award" }
];

export const GALLERY_ITEMS = [
    {
        id: 1,
        category: "class",
        title: "Classroom 1 - Main Wing",
        description: "Spacious physical layout crafted to maintain focus during intensive lecture batches.",
        detailedInfo: "This primary block of Classroom 1 features high-capacity row configurations and acoustics designed to prevent echoes, ensuring clarity during 3-hour long marathon lecture modules for 11th, 12th, JEE, and MHT-CET aspirants.",
        image: class1
    },
    {
        id: 2,
        category: "class",
        title: "Digital Interactive Board Setup",
        description: "The exclusive technology unit of the academy used for core structural derivations.",
        detailedInfo: "This setup stands as our primary active dynamic screen device. Educators utilize its precise tracking canvas to draft complex workflows, calculus formulas, and advanced diagrams step-by-step during complex engineering lectures.",
        image: whiteboard
    },
    {
        id: 3,
        category: "library",
        title: "Central Library - Reading Vault",
        description: "A completely traditional deep-focus silent zone holding over 1,000 reference manuals.",
        detailedInfo: "Our core library wing relies purely on physical learning materials. It features quiet standalone wood tables and compact study matrices stacked with over 1,000 standard physical volumes, past exam papers, and syllabus textbooks.",
        image: Library
    },
    {
        id: 4,
        category: "class",
        title: "Classroom 1 - Revision Bay",
        description: "Secondary classroom section dedicated to fast-track board practice papers.",
        detailedInfo: "An extension of the Classroom 1 framework arranged specifically for crash courses, fast revisions, and quick test discussions. The focused physical layout keeps face-to-face feedback instantaneous between students and senior mentors.",
        image: class1_1
    },
    {
        id: 5,
        category: "library",
        title: "Central Library - Reference Stack",
        description: "Quiet physical rows built inside the main library for advanced text tracking.",
        detailedInfo: "Part of our single centralized library, this rows collection houses premium theoretical hardcopies and reference notebooks. Students access this silent bay specifically to review advanced level physics and math books.",
        image: Library2
    },
    {
        id: 6,
        category: "infrastructure",
        title: "Main Entrance Lobby",
        description: "Connecting structural zone anchoring physical notice arrays and student updates.",
        detailedInfo: "The absolute main entrance hub of the institution that links transition paths to different classroom sectors. It houses physical display boards where schedule tables and upcoming test notices are systematically pinned daily.",
        image: inter
    },
    {
        id: 7,
        category: "class",
        title: "Classroom 2 - Standard Lecture Hub",
        description: "Standard classroom grid crafted with deep dual-channel natural ventilation layout.",
        detailedInfo: "Classroom 2 provides a balanced, completely distraction-free workspace. It uses high-efficiency air cooling layouts and standard wide benches to optimize student physical stamina during intensive evaluation rounds.",
        image: class2
    },
    {
        id: 8,
        category: "library",
        title: "Central Library - Study Hall",
        description: "Extended large table layout built within the library grid for self-study hours.",
        detailedInfo: "A spacious reading zone inside the main library tailored for continuous review. Free from device distractions, it provides a quiet area where students focus entirely on reviewing physical mock question booklets.",
        image: Library3
    },
    {
        id: 9,
        category: "class",
        title: "Classroom 1 - Doubt Arena",
        description: "Dedicated solution quadrant within Classroom 1 for targeted concept breakdowns.",
        detailedInfo: "A specific workspace layout inside Classroom 1 where students gather directly around the educator's desk to clear learning bottlenecks. This setup allows collective, real-time resolution of complex textbook problems.",
        image: class1_2
    },
    {
        id: 10,
        category: "class",
        title: "Classroom 2 - Study Bay",
        description: "Spacious structural layout layout built with wide-angle sightlines.",
        detailedInfo: "An integrated extension section of Classroom 2 engineered to avoid blind spots. The simple physical design guarantees a completely clear and direct view of the educator's main board location from any seat in the hall.",
        image: class2_1
    },
    {
        id: 11,
        category: "class",
        title: "Classroom 2 - Analytical Review Hall",
        description: "Optimized space for manual test evaluations and mock paper discussions.",
        detailedInfo: "The primary review wing of Classroom 2 used for post-test analysis. Educators leverage this hall to grade answer papers and map out conceptual trends directly on the board for all JEE and MHT-CET batches.",
        image: class2_2
    }
];