export default function TermsConditions() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 dark:from-[#020205] dark:to-[#0b0b12] text-black dark:text-white px-6 py-20">

            <div className="max-w-5xl mx-auto">

                {/* HEADER */}

                <div className="text-center mb-16">

                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-violet-600/10 border border-violet-500/20 mb-6 shadow-lg">

                        <span className="text-4xl font-black text-violet-600">
                            K
                        </span>

                    </div>

                    <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
                        Terms & Conditions
                    </h1>

                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Please read these Terms & Conditions carefully before
                        using Karmaveer Science Academy services, website,
                        online tests, and educational platform.
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm text-violet-600 dark:text-violet-300">

                        <span className="w-2 h-2 rounded-full bg-violet-500"></span>

                        Last Updated: May 23, 2026

                    </div>

                </div>

                {/* MAIN CARD */}

                <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl p-8 md:p-14">

                    {/* INTRO */}

                    <section className="mb-14">

                        <h2 className="text-3xl font-bold mb-5 text-violet-600 dark:text-violet-400">
                            Acceptance of Terms
                        </h2>

                        <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">
                            By accessing or using Karmaveer Science Academy
                            services, you agree to comply with these Terms
                            & Conditions and all applicable laws and regulations.
                        </p>

                    </section>

                    {/* WEBSITE USAGE */}

                    <section className="mb-14">

                        <h2 className="text-3xl font-bold mb-6 text-violet-600 dark:text-violet-400">
                            Website Usage
                        </h2>

                        <div className="space-y-4">

                            {[
                                "This platform is intended only for educational purposes.",
                                "Users must not misuse, hack, or attempt unauthorized access.",
                                "Students must provide accurate registration details.",
                                "Users are responsible for maintaining account confidentiality."
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                                >

                                    <div className="w-7 h-7 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm font-bold mt-1">
                                        ✓
                                    </div>

                                    <p className="text-slate-700 dark:text-slate-300 text-lg">
                                        {item}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </section>

                    {/* STUDENT ACCOUNTS */}

                    <section className="mb-14">

                        <h2 className="text-3xl font-bold mb-5 text-violet-600 dark:text-violet-400">
                            Student Accounts
                        </h2>

                        <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">
                            Students are responsible for maintaining the security
                            of their accounts and login credentials. Sharing
                            accounts with others is strictly prohibited.
                        </p>

                    </section>

                    {/* STUDY MATERIALS */}

                    <section className="mb-14">

                        <h2 className="text-3xl font-bold mb-5 text-violet-600 dark:text-violet-400">
                            Study Materials & Tests
                        </h2>

                        <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">
                            All study materials, notes, online tests, videos,
                            and educational content belong to Karmaveer Science Academy
                            and may not be copied, distributed, or reused without permission.
                        </p>

                    </section>

                    {/* LIMITATION */}

                    <section className="mb-14">

                        <h2 className="text-3xl font-bold mb-5 text-violet-600 dark:text-violet-400">
                            Limitation of Liability
                        </h2>

                        <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">
                            Karmaveer Science Academy is not responsible for
                            internet interruptions, technical failures,
                            temporary downtime, or data loss caused by
                            third-party services.
                        </p>

                    </section>

                    {/* POLICY CHANGES */}

                    <section className="mb-14">

                        <h2 className="text-3xl font-bold mb-5 text-violet-600 dark:text-violet-400">
                            Changes to Terms
                        </h2>

                        <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">
                            We may update these Terms & Conditions at any time.
                            Continued use of the platform after updates
                            means you accept the revised terms.
                        </p>

                    </section>

                    {/* CONTACT */}

                    <section>

                        <h2 className="text-3xl font-bold mb-6 text-violet-600 dark:text-violet-400">
                            Contact Information
                        </h2>

                        <div className="p-8 rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-xl">

                            <h3 className="text-2xl font-bold mb-4">
                                Karmaveer Science Academy
                            </h3>

                            <div className="space-y-3 text-lg">

                                <p>
                                    📍 Suryanagari, Baramati, Maharashtra 413102
                                </p>

                                <p>
                                    📧 info@karmaveerscienceacademy.in
                                </p>

                                <p>
                                    📞 +91 9763120121
                                </p>

                            </div>

                        </div>

                    </section>

                </div>

            </div>

        </div>
    );
}