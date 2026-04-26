import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiInstagram, FiYoutube } from "react-icons/fi";
import { Mail, MapPin, Phone, Send, GraduationCap, Code2 } from "lucide-react";

// Performance: Extracting static data outside the component 
// prevents re-creation of arrays on every render.
const SOCIAL_LINKS = [
  { Icon: FiInstagram, href: "#" },
  { Icon: FiYoutube, href: "#" },
  { Icon: FiLinkedin, href: "#" },
  { Icon: FiGithub, href: "#" }
];

const EXPLORE_LINKS = ['Home', 'Dashboard', 'Problems', 'Leaderboard'];

export default function Footer() {
    return (
        <footer className="bg-[#020105] text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden contain-paint">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 transform-gpu">
                    
                    {/* 1. BRAND & DEVELOPER */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 group">
                                <GraduationCap className="text-purple-500 transition-transform group-hover:scale-110" size={28} />
                                <h2 className="text-2xl font-black tracking-tighter italic uppercase">
                                    KSA <span className="text-purple-500 font-medium">Academy</span>
                                </h2>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                Empowering students with elite coaching for JEE, NEET, and MHT-CET. 
                            </p>
                        </div>

                        {/* Developer Signature - Using Hardware Acceleration */}
                        <div className="flex items-center gap-3 py-4 border-t border-white/5 will-change-transform">
                            <div className="p-2 rounded-lg bg-white/5 text-purple-400">
                                <Code2 size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-black">Developer</p>
                                <p className="text-sm font-bold text-gray-200">Aditya Waghmare</p>
                            </div>
                        </div>

                        {/* Social Links - Optimized transitions */}
                        <div className="flex gap-4">
                            {SOCIAL_LINKS.map(({ Icon, href }, i) => (
                                <a key={i} href={href} className="text-gray-500 hover:text-purple-500 transition-colors duration-200 transform-gpu">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 2. NAVIGATION */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-6">Explore</h3>
                        <ul className="space-y-4 text-sm font-bold">
                            {EXPLORE_LINKS.map((item) => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase()}`} className="text-gray-500 hover:text-purple-400 transition-colors duration-200 block">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. CONTACT */}
                    <div className="lg:col-span-3">
                        <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-6">Developer Contact</h3>
                        <ul className="space-y-4 text-sm font-bold">
                            <li className="flex items-center gap-3 text-gray-500">
                                <MapPin size={16} className="text-purple-500 shrink-0" />
                                <span>Baramati, MH</span>
                            </li>
                            <li>
                                <a href="tel:+919673298788" className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors">
                                    <Phone size={16} className="text-purple-500 shrink-0" />
                                    <span>+91 96732 98788</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:adityawaghmare@gmail.com" className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors truncate block">
                                    <Mail size={16} className="text-purple-500 shrink-0" />
                                    <span>adityawaghmare@gmail.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 4. NEWSLETTER - Optimized Input rendering */}
                    <div className="lg:col-span-3 space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-6">Updates</h3>
                        <div className="relative group">
                            <div className="flex bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden focus-within:border-purple-500/50 transition-all transform-gpu">
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    className="bg-transparent px-4 py-3 text-sm outline-none w-full text-white placeholder:text-gray-600"
                                />
                                <button className="bg-purple-600 px-4 flex items-center justify-center hover:bg-purple-500 transition-colors active:scale-95 transform-gpu">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-black text-center">
                        © {new Date().getFullYear()} KSA Academy • Excellence First
                    </p>
                </div>
            </div>
        </footer>
    );
}