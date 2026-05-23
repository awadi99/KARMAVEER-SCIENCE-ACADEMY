export default function PrivacyPolicy() {
    return (
        // min-h-screen ensures it fills the mobile screen, px-4 handles small side margins
        <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-slate-200 px-4 sm:px-6 py-10 md:py-20">
            <div className="max-w-4xl mx-auto">
                
                {/* HEADER - Responsive Text Sizes */}
                <div className="mb-10 sm:mb-16 border-l-4 border-blue-700 pl-4 sm:pl-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-3">
                        Privacy Policy
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                        Karmaveer Science Academy – Committed to academic integrity.
                    </p>
                    <div className="mt-4 text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-400">
                        Last Updated: May 23, 2026
                    </div>
                </div>

                {/* CONTENT CARD - Responsive Padding */}
                <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 sm:p-8 md:p-12">
                    
                    <section className="mb-10">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900 dark:text-white">Introduction</h2>
                        <p className="leading-7 sm:leading-8 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                            Karmaveer Science Academy respects your privacy. This policy outlines how we handle data 
                            collected through our educational platform to ensure a safe learning environment.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-slate-900 dark:text-white">Information We Collect</h2>
                        {/* Grid changes from 1 column (mobile) to 2 columns (tablet+) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: "Personal Details", desc: "Name, contact info, and registration details." },
                                { title: "Academic Records", desc: "Test scores, attendance, and progress." },
                                { title: "Account Activity", desc: "Login history and participation logs." },
                                { title: "Technical Data", desc: "Device info and analytics." }
                            ].map((item, i) => (
                                <div key={i} className="p-4 border border-slate-100 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-[#0f172a]">
                                    <h3 className="font-bold text-blue-800 dark:text-blue-400 text-sm sm:text-base mb-1">{item.title}</h3>
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl sm:text-2xl font-bold mb-5 text-slate-900 dark:text-white">How We Use Information</h2>
                        <ul className="space-y-3">
                            {[
                                "To conduct classes and manage administrative tasks.",
                                "To provide performance analysis for online tests.",
                                "To send academic schedule and exam alerts.",
                                "To maintain platform security."
                            ].map((text, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* CONTACT BOX - Responsive Grid */}
                    <div className="mt-8 p-6 sm:p-8 rounded-xl bg-slate-100 dark:bg-[#0f172a] border-l-4 border-blue-600">
                        <h3 className="text-lg sm:text-xl font-bold mb-4 text-slate-900 dark:text-white">Get in Touch</h3>
                        <div className="flex flex-col gap-3 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                            <p>📍 Suryanagari, Baramati, 413102</p>
                            <p>📧 info@karmaveerscienceacademy.in</p>
                            <p>📞 +91 9763120121</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}