import React, { useMemo } from 'react';
import { MessageSquare, MapPin } from 'lucide-react';
import { CONTACT_CONFIG } from '../../constants/contactData.js';

// 1. MEMOIZED PURE COMPONENT
// will-change-transform promotes this to its own compositor layer
const InfoCard = React.memo(({ icon: Icon, title, detail, subDetail, href }) => {
    const CardWrapper = href ? 'a' : 'div';
    return (
        <CardWrapper
            href={href}
            className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] transition-colors duration-200 hover:border-purple-500/40 hover:bg-white/[0.04] outline-none group will-change-transform transform-gpu"
        >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-purple-500/10 text-purple-500 group-hover:bg-purple-600 group-hover:text-white transition-all transform-gpu">
                <Icon size={18} />
            </div>
            <div className="overflow-hidden min-w-0">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500/60 mb-1">{title}</h4>
                <p className="text-sm md:text-base font-bold text-white truncate leading-tight">{detail}</p>
                {subDetail && <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-tighter">{subDetail}</p>}
            </div>
        </CardWrapper>
    );
});

export default function ContactUs() {
    const { header, contacts, location } = CONTACT_CONFIG;

    // UseMemo for the map style to prevent object creation on re-renders
    const mapStyle = useMemo(() => ({ 
        border: 0, 
        filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)',
        pointerEvents: 'none' // Prevents scroll hijacking unless clicked
    }), []);

    return (
        <section id="contact" className="min-h-screen bg-[#020105] text-white pt-28 pb-12 px-6 relative overflow-hidden contain-layout">

            {/* 2. BACKGROUND OPTIMIZATION 
                Using radial-gradients instead of blur filters. 
                Blur filters are 10x heavier on the GPU than gradients. */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-purple-600/10 to-transparent opacity-50 pointer-events-none transform-gpu" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-indigo-600/10 to-transparent opacity-50 pointer-events-none transform-gpu" />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* HEADER SECTION - Removed motion for raw performance */}
                <div className="mb-16 text-center lg:text-left transform-gpu">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                        <MessageSquare size={12} className="text-purple-500" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-400">{header.badge}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-[0.9]">
                        {header.title} <br />
                        <span className="text-purple-600">{header.titleAccent}</span>
                    </h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    
                    {/* INFO COLUMN */}
                    <div className="space-y-4 transform-gpu">
                        <div className="grid gap-4">
                            {contacts.map((item) => (
                                <InfoCard key={item.id} {...item} />
                            ))}
                        </div>

                        {/* CAMPUS ADDRESS */}
                        <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 flex gap-5 items-start transform-gpu">
                            <div className="p-3 bg-white/5 rounded-2xl text-purple-500">
                                <MapPin size={22} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-1 italic">Visit KSA</h4>
                                <p className="text-lg font-bold text-white leading-tight">{location.address}</p>
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">{location.city}</p>
                            </div>
                        </div>
                    </div>

                    {/* 3. MAP OPTIMIZATION 
                        Added 'group' to handle pointer events and transform-gpu */}
                    <div 
                        className="aspect-square lg:aspect-auto lg:h-[500px] rounded-[2.5rem] overflow-hidden border border-white/5 bg-black relative shadow-2xl transform-gpu group"
                        onClick={(e) => e.currentTarget.querySelector('iframe').style.pointerEvents = 'auto'}
                    >
                        <iframe
                            title="KSA Location"
                            src={location.mapUrl}
                            className="w-full h-full opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                            style={mapStyle}
                            allowFullScreen=""
                            loading="lazy"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}