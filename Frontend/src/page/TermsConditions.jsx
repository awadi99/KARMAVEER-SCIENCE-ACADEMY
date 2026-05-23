export default function TermsConditions() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-slate-200 px-4 sm:px-6 py-10 md:py-20">
            <div className="max-w-4xl mx-auto">
                
                {/* HEADER - Professional Blue Theme */}
                <div className="mb-10 sm:mb-16 border-l-4 border-blue-700 pl-4 sm:pl-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-3">
                        Terms & Conditions
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                        Guidelines for using Karmaveer Science Academy services.
                    </p>
                    <div className="mt-4 text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-400">
                        Last Updated: May 23, 2026
                    </div>
                </div>

                {/* MAIN CONTENT CARD */}
                <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 sm:p-8 md:p-12">
                    
                    <section className="mb-10">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900 dark:text-white">Acceptance of Terms</h2>
                        <p className="leading-7 sm:leading-8 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                            By accessing our website and educational platform, you agree to comply with 
                            these Terms & Conditions. If you do not agree with any part of these terms, 
                            please refrain from using our services.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-slate-900 dark:text-white">Website Usage</h2>
                        <div className="space-y-3">
                            {[
                                "This platform is intended exclusively for educational and coaching purposes.",
                                "Users must not engage in hacking, data scraping, or unauthorized access.",
                                "Providing accurate registration and contact information is mandatory.",
                                "Account holders are solely responsible for their login credentials."
                            ].map((text, i) => (
                                <div key={i} className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-[#0f172a] border border-slate-100 dark:border-slate-700">
                                    <span className="text-blue-600 font-bold">•</span>
                                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">{text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900 dark:text-white">Student Account Policy</h2>
                        <p className="leading-7 sm:leading-8 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                            Each student account is meant for individual use. Sharing account credentials 
                            with others is strictly prohibited and may result in permanent suspension 
                            without prior notice.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900 dark:text-white">Intellectual Property</h2>
                        <p className="leading-7 sm:leading-8 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                            All study materials, mock tests, videos, and platform content are the 
                            exclusive property of Karmaveer Science Academy. Any unauthorized 
                            distribution or reproduction is a violation of our terms.
                        </p>
                    </section>

                    {/* CONTACT BOX - Modern & Mobile Friendly */}
                    <div className="mt-8 p-6 sm:p-8 rounded-xl bg-slate-100 dark:bg-[#0f172a] border-l-4 border-blue-600">
                        <h3 className="text-lg sm:text-xl font-bold mb-4 text-slate-900 dark:text-white">Questions?</h3>
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