import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Clock, ArrowUpRight } from 'lucide-react';
import { CONTACT_CONFIG } from '../../constants/contactData.js';
import { Helmet } from 'react-helmet-async';


// Pre-define variants outside to prevent object recreation
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { 
            staggerChildren: 0.08, // Faster stagger
            delayChildren: 0.1 
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 }, // Reduced y-offset for smoother feel
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] } 
    }
};

// Memoized InfoCard to prevent unnecessary re-renders
const InfoCard = React.memo(({ icon: Icon, title, detail, subDetail, href }) => {
    const CardWrapper = href ? 'a' : 'div';
    
    return (
        <motion.div 
            variants={itemVariants} 
            className="transform-gpu will-change-transform"
        >
            <CardWrapper
                href={href}
                className="flex flex-col p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E293B] hover:shadow-xl hover:border-blue-600 transition-all duration-200 group outline-none relative overflow-hidden"
            >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 mb-4">
                    <Icon size={24} />
                </div>
                <div className="min-w-0">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                        {title}
                    </h4>
                    <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-tight truncate">
                        {detail}
                    </p>
                    {subDetail && <p className="text-xs text-slate-500 mt-2 font-medium">{subDetail}</p>}
                </div>
                {href && <ArrowUpRight size={14} className="absolute top-4 right-4 text-slate-300 group-hover:text-blue-600 transition-colors" />}
            </CardWrapper>
        </motion.div>
    );
});

InfoCard.displayName = "InfoCard";

export default function ContactUs() {
    const { header, contacts, location } = CONTACT_CONFIG;

    // UseMemo for styles that don't change to prevent style recalculation lag
    const styles = useMemo(() => ({
        section: { 
            contain: 'content', // Optimized for browser layout engine
            contentVisibility: 'auto' 
        },
        mapContainer: {
            WebkitMaskImage: '-webkit-radial-gradient(white, black)', // Fixes border-radius flicker in Safari
        },
        iframe: { 
            border: 0, 
            filter: 'grayscale(0.1)', 
            opacity: 0.98,
            backgroundColor: '#1e293b' // Placeholder color while loading
        }
    }), []);

    return (
        <section 
            id="contact" 
            aria-label="Contact Information"
            className="min-h-screen bg-slate-50 dark:bg-[#0F172A] text-slate-900 dark:text-white pt-24 pb-16 px-4 md:px-8 lg:px-16"
            style={styles.section}
        >

<Helmet>
    <script type="application/ld+json">
    {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "Karmaveer Science Academy",
        "description": "Best coaching institute for 11th & 12th Science in Baramati.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": CONTACT_CONFIG.location.address,
            "addressLocality": CONTACT_CONFIG.location.city,
            "addressRegion": CONTACT_CONFIG.location.state,
            "postalCode": CONTACT_CONFIG.location.postalCode,
            "addressCountry": CONTACT_CONFIG.location.country
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": CONTACT_CONFIG.location.lat,
            "longitude": CONTACT_CONFIG.location.lng
        },
        "telephone": "+919763120121",
        "email": "karmaveerstudycenter@gmail.com",
        "openingHours": "Mo-Su 10:00-20:00"
    })}
    </script>
</Helmet>

            <div className="max-w-[1440px] mx-auto relative">
                
                {/* ACADEMIC HEADER */}
                <div className="mb-12 lg:mb-20 text-center lg:text-left border-b border-slate-200 dark:border-slate-800 pb-12">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center lg:justify-start gap-3 mb-6"
                    >
                        <GraduationCap className="text-blue-600" size={32} />
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 dark:text-blue-400/80">Support Center</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-none mb-6"
                    >
                        {header.title} <span className="text-blue-600 dark:text-blue-500">{header.titleAccent}</span>
                    </motion.h2>
                    <p className="text-slate-500 dark:text-slate-400 text-base md:text-xl max-w-2xl font-medium leading-relaxed">
                        Connect with our admissions team to learn more about our upcoming programs and campus life.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                    
                    {/* INFO COLUMN */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="lg:col-span-4 flex flex-col gap-4 order-2 lg:order-1"
                    >
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                            {contacts.map((item) => (
                                <InfoCard key={item.id} {...item} />
                            ))}
                        </div>

                        {/* Schedule Card */}
                        <motion.div 
                            variants={itemVariants}
                            className="p-8 rounded-2xl bg-blue-600 text-white shadow-lg relative overflow-hidden transform-gpu"
                        >
                            <Clock size={80} className="absolute top-0 right-0 p-6 opacity-10" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-80">Campus Hours</h4>
                            <p className="text-2xl font-bold mb-1">Mon — Sat</p>
                            <p className="text-sm font-medium opacity-90">09:00 AM - 06:00 PM</p>
                        </motion.div>
                    </motion.div>

                    {/* MAP SECTION */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        style={styles.mapContainer}
                        className="lg:col-span-8 min-h-[400px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-[#1E293B] relative order-1 lg:order-2 shadow-inner"
                    >
                        <iframe
                            title="Google Maps Location for Karmaveer Science Academy"
                            src={location.mapUrl}
                            className="w-full h-full"
                            style={styles.iframe}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        
                        {/* Address Overlay */}
                        <div className="absolute bottom-6 left-6 right-6 md:right-auto p-5 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md shadow-2xl rounded-2xl border border-slate-200/50 dark:border-slate-800 flex items-center gap-4 max-w-sm transform-gpu">
                            <div className="p-3 bg-blue-600 rounded-xl text-white shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-0.5">Campus Base</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">{location.address}</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">{location.city}</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};