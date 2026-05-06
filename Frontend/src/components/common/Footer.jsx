import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiInstagram, FiYoutube } from "react-icons/fi";
import { Mail, MapPin, Phone, Send, Code2, Award } from "lucide-react";

const SOCIAL_LINKS = [
    { Icon: FiInstagram, href: "#" },
    { Icon: FiYoutube, href: "#" },
    { Icon: FiLinkedin, href: "#" },
    { Icon: FiGithub, href: "#" }
];

const EXPLORE_LINKS = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/register' },
    { name: 'Test Series', path: '/register' },
];

export default function Footer() {
    return (
        <footer className="bg-[#0A1128] text-white pt-16 md:pt-20 pb-10 border-t border-amber-500/20 relative overflow-hidden contain-paint">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-amber-500/40 via-transparent to-transparent" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 md:w-96 md:h-96 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none transform-gpu" />

            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">

                {/* Main Grid: Defaults to 1 col (left aligned) and scales up */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8 mb-16 transform-gpu">

                    {/* 1. BRAND IDENTITY - Forced Left Alignment */}
                    <div className="lg:col-span-4 space-y-8 text-left">
                        <div className="space-y-4">
                            <div className="flex items-center justify-start gap-4 group">
                                <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center shadow-xl shadow-amber-900/20 group-hover:scale-105 transition-transform transform-gpu overflow-hidden">
                                    <img src="/image/logo.jpeg" className="h-full w-full object-cover" alt="KSA Logo" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    KSA <span className="text-amber-500">ACADEMY</span>
                                </h2>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
                                Premier coaching for JEE, NEET, and MHT-CET. Dedicated to fostering academic brilliance and disciplined success.
                            </p>
                        </div>

                        {/* Developer Signature - Left Aligned */}
                        <div className="inline-flex items-center gap-3 py-3 px-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-amber-500/30 transition-all transform-gpu">
                            <Code2 size={18} className="text-amber-500" />
                            <div className="text-left">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-black">Digital Architect</p>
                                <p className="text-sm font-bold text-slate-200 group-hover:text-amber-500 transition-colors">Aditya Waghmare</p>
                            </div>
                        </div>
                    </div>

                    {/* 2. NAVIGATION */}
                    <div className="lg:col-span-2 text-left">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-500 mb-8">Academic</h3>
                        <ul className="space-y-4 text-sm font-bold">
                            {EXPLORE_LINKS.map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block transform-gpu">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. CAMPUS CONTACT */}
                    <div className="lg:col-span-3 text-left">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-500 mb-8">Office Desk</h3>
                        <ul className="space-y-5 text-sm font-bold">
                            <li className="flex items-start justify-start gap-4 text-slate-400">
                                <MapPin size={20} className="text-amber-600 shrink-0 mt-0.5" />
                                <span className="leading-snug">Main Campus, Baramati,<br />Maharashtra 413102</span>
                            </li>
                            <li>
                                <a href="tel:+919673298788" className="flex items-center justify-start gap-4 text-slate-400 hover:text-white transition-all group transform-gpu">
                                    <Phone size={18} className="text-amber-600 shrink-0 group-hover:rotate-12 transition-transform" />
                                    <span>+91 96732 98788</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:adityawaghmare@gmail.com" className="flex items-center justify-start gap-4 text-slate-400 hover:text-white transition-all group truncate block transform-gpu">
                                    <Mail size={18} className="text-amber-600 shrink-0 group-hover:-translate-y-1 transition-transform" />
                                    <span className="truncate">adityawaghmare@gmail.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 4. NEWSLETTER */}
                    <div className="lg:col-span-3 space-y-8 text-left">
                        <div>
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-500 mb-6">Stay Updated</h3>
                            <div className="flex bg-white/5 rounded-2xl border border-white/10 focus-within:border-amber-500/50 transition-all p-1.5 transform-gpu">
                                <input
                                    type="email"
                                    placeholder="Future Student Email"
                                    className="bg-transparent px-4 py-2 text-sm outline-none w-full text-white placeholder:text-slate-700"
                                />
                                <button className="bg-amber-500 p-2.5 rounded-xl hover:bg-amber-400 transition-all active:scale-90 shadow-lg shadow-amber-900/20 transform-gpu shrink-0">
                                    <Send size={18} className="text-[#0A1128]" />
                                </button>
                            </div>
                        </div>

                        {/* Social Icons - Left Aligned */}
                        <div className="flex justify-start gap-6">
                            {SOCIAL_LINKS.map(({ Icon, href }, i) => (
                                <a key={i} href={href} className="text-slate-600 hover:text-amber-500 transition-all transform hover:-translate-y-2 transform-gpu">
                                    <Icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer Bottom Bar - Left Aligned on all screens */}
                <div className="pt-8 border-t border-white/5 flex justify-start items-center">
                    <div className="flex items-center gap-3">
                        <Award size={16} className="text-amber-800 shrink-0" />
                        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-600">
                            © {new Date().getFullYear()} KSA ACADEMY • EXCELLENCE FIRST
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}