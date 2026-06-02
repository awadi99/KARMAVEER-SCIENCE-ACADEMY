import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiInstagram, FiYoutube } from "react-icons/fi";
import { Mail, MapPin, Phone, Send, Code2, Award } from "lucide-react";

const SOCIAL_LINKS = [
    { Icon: FiInstagram, href: "https://www.instagram.com/karmaveer_science_academy" },
    { Icon: FiYoutube, href: "https://youtube.com/@karmaveerstudycenter1264?si=GUb31mefVkhJEWPz" },
    { Icon: FiLinkedin, href: "https://www.linkedin.com/in/aditya-waghmare-95271b25a/" },
    { Icon: FiGithub, href: "https://github.com/awadi99" }
];

const EXPLORE_LINKS = [
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/terms-and-conditions' },
];



export default function Footer() {
    return (
        /* Replaced sharp tech dark navy with premium academic Deep Slate Blue (#0F172A) & clean borders */
        <footer className="bg-[#0F172A] text-white pt-16 md:pt-20 pb-10 border-t border-slate-800 relative overflow-hidden contain-paint">
            {/* Background Accents: Shifted flash amber to high-fidelity corporate blue tint lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-blue-500/20 via-transparent to-transparent" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 md:w-96 md:h-96 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none transform-gpu" />

            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">

                {/* Main Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8 mb-16 transform-gpu">

                    {/* 1. BRAND IDENTITY */}
                    <div className="lg:col-span-4 space-y-8 text-left">
                        <div className="space-y-4">
                            <div className="flex items-center justify-start gap-4 group">
                                {/* Changed gaming orange logo shield block to a structured white academic logo frame */}
                                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform transform-gpu overflow-hidden">
                                    <img src="/image/logo.jpeg" className="h-full w-full object-cover" alt="KSA Logo" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight text-white">
                                    KSA <span className="text-[#3B82F6]">ACADEMY</span>
                                </h2>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
                                Premier coaching for JEE and MHT-CET. Dedicated to fostering academic brilliance and disciplined success.
                            </p>
                        </div>

                        {/* Developer Signature: Shifted color accents to reliable slate/blue tone */}
                        <div className="inline-flex items-center gap-3 py-3 px-5 rounded-2xl bg-white/5 border border-slate-800 group hover:border-blue-500/30 transition-all transform-gpu">
                            <Code2 size={18} className="text-[#3B82F6]" />
                            <div className="text-left">
                                <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-black">Developed By</p>
                                <p className="text-sm font-bold text-slate-300 group-hover:text-[#3B82F6] transition-colors">Aditya Waghmare</p>
                            </div>
                        </div>
                    </div>

                    {/* 2. NAVIGATION */}
                    <div className="lg:col-span-2 text-left">
                        {/* Switched header colors from glowing amber to classic institutional Blue-400 */}
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#3B82F6] mb-8">Academic</h3>
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
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#3B82F6] mb-8">Developer Info</h3>
                        <ul className="space-y-5 text-sm font-bold">
                            <li className="flex items-start justify-start gap-4 text-slate-400">
                                <MapPin size={20} className="text-slate-500 shrink-0 mt-0.5" />
                                <span className="leading-snug">Satav Chowk, Baramati,<br />Maharashtra 413102</span>
                            </li>
                            <li>
                                <a href="tel:+919673298788" className="flex items-center justify-start gap-4 text-slate-400 hover:text-white transition-all group transform-gpu">
                                    <Phone size={18} className="text-slate-500 shrink-0 group-hover:rotate-12 transition-transform" />
                                    <span>+91 96732 98788</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:adityawaghmare@gmail.com" className="flex items-center justify-start gap-4 text-slate-400 hover:text-white transition-all group truncate block transform-gpu">
                                    <Mail size={18} className="text-slate-500 shrink-0 group-hover:-translate-y-1 transition-transform" />
                                    <span className="truncate">adityawaghmare9990@gmail.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 4. NEWSLETTER */}
                    <div className="lg:col-span-3 space-y-8 text-left">
                        <div>
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#3B82F6] mb-6">Stay Updated</h3>
                            {/* Newsletter input card adjustments: replaced glowing amber highlight with deep focus blue standard */}
                            <div className="flex bg-white/5 rounded-2xl border border-slate-800 focus-within:border-blue-500/50 transition-all p-1.5 transform-gpu">
                                <input
                                    type="email"
                                    placeholder="Future Student Email"
                                    className="bg-transparent px-4 py-2 text-sm outline-none w-full text-white placeholder:text-slate-600"
                                />
                                <button className="bg-[#2563EB] p-2.5 rounded-xl hover:bg-[#1D4ED8] transition-all active:scale-90 shadow-md shadow-blue-900/10 transform-gpu shrink-0">
                                    <Send size={18} className="text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex justify-start gap-6">
                            {SOCIAL_LINKS.map(({ Icon, href }, i) => (
                                <a key={i} href={href} className="text-slate-500 hover:text-[#3B82F6] transition-all transform hover:-translate-y-2 transform-gpu">
                                    <Icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer Bottom Bar */}
                <div className="pt-8 border-t border-slate-800/60 flex justify-start items-center">
                    <div className="flex items-center gap-3">
                        <Award size={16} className="text-slate-600 shrink-0" />
                        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">
                            © {new Date().getFullYear()} KSA ACADEMY • EXCELLENCE FIRST
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
