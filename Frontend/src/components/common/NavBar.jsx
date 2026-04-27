import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, ArrowUpRight, Menu, X } from "lucide-react";
import { useLenis } from '../scroll/SmoothScroll';
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar({ isDark, setIsDark }) {

    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const lenis = useLenis();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    useEffect(() => {
        if (isOpen) {
            lenis?.stop();
            document.body.style.overflow = "hidden";
        } else {
            lenis?.start();
            document.body.style.overflow = "auto";
        }
    }, [isOpen, lenis]);

    const handleScrollTo = (e, href) => {
        e.preventDefault();

        if (isOpen) setIsOpen(false);

        if (lenis) {

            setTimeout(() => {
                lenis.scrollTo(href, {
                    offset: -100,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
            }, 10);
        } else {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-4 md:top-8 left-0 w-full z-[1000] px-4 md:px-6 pointer-events-none">
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`
                    max-w-5xl mx-auto pointer-events-auto flex items-center justify-between px-2 py-2 rounded-2xl border transition-all duration-700
                    ${scrolled
                        ? "bg-white/90 dark:bg-[#0A1128]/80 backdrop-blur-2xl border-slate-200 dark:border-amber-500/20 shadow-xl"
                        : "bg-transparent border-transparent"
                    }
                `}
            >
                {/* BRAND LOGO */}
                <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4">
                    <div className="h-9 w-9 bg-[#0A1128] dark:bg-amber-500 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:rotate-12">
                        <img src="/image/logo.jpeg" className="text-white rounded-full h-7 w-7" alt="Logo" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-black tracking-tighter text-slate-900 dark:text-white uppercase text-2xl md:text-2xl">
                            KSA<span className="text-2xl text-amber-500 "> .</span>
                        </span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#0A1128] dark:text-amber-500 uppercase">
                            Academy
                        </span>
                    </div>
                </div>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleScrollTo(e, item.href)}
                            className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-[#0A1128] dark:hover:text-amber-400 transition-all rounded-xl hover:bg-slate-100 dark:hover:bg-amber-500/10"
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>

                {/* ACTIONS HUB */}
                <div className="flex items-center gap-2 pr-1 md:pr-2">
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="p-2.5 rounded-xl bg-white dark:bg-[#0A1128] text-slate-900 dark:text-amber-500 border border-slate-200 dark:border-amber-500/20 shadow-sm active:scale-90 transition-all"
                    >
                        <AnimatePresence mode="wait">
                            {isDark ? (
                                <motion.div key="moon" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }}>
                                    <Moon size={18} />
                                </motion.div>
                            ) : (
                                <motion.div key="sun" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }}>
                                    <Sun size={18} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    <button onClick={()=>navigate('/register')} className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-[#0A1128] dark:bg-amber-500 text-white dark:text-[#0A1128] text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 dark:hover:bg-amber-400 hover:shadow-lg transition-all active:scale-95">
                        Apply <ArrowUpRight size={14} />
                    </button>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2.5 rounded-xl text-slate-900 dark:text-white bg-white dark:bg-[#0A1128] border border-slate-200 dark:border-amber-500/20 shadow-sm"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-white/90 dark:bg-[#0A1128]/95 backdrop-blur-xl z-[1001] md:hidden pointer-events-auto"
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-screen w-[85%] max-w-[320px] bg-white dark:bg-[#0A1128] border-l border-slate-200 dark:border-amber-500/20 p-10 flex flex-col z-[1002] md:hidden shadow-2xl pointer-events-auto"
                        >
                            <div className="flex justify-end mb-12">
                                <button onClick={() => setIsOpen(false)} className="p-2 text-slate-900 dark:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-8">
                                {navItems.map((item, i) => (
                                    <motion.a
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => handleScrollTo(e, item.href)}
                                        className="text-5xl font-black uppercase tracking-tighter text-[#0A1128] dark:text-white hover:text-amber-500 dark:hover:text-amber-500 transition-colors"
                                    >
                                        {item.name}
                                    </motion.a>
                                ))}
                            </nav>

                            <div className="mt-auto">
                                <Button onClick={()=>navigate('/register')} className="w-full py-5 bg-[#0A1128] dark:bg-amber-500 text-white dark:text-[#0A1128] font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-xl">
                                    Join Academy
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}