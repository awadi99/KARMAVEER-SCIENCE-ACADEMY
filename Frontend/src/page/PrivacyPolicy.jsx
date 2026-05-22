export default function PrivacyPolicy() {
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
                        Privacy Policy
                    </h1>

                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Your privacy and data security are important to us.
                        This Privacy Policy explains how Karmaveer Science Academy
                        collects, uses, and protects student information.
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
                            Introduction
                        </h2>

                        <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">
                            Karmaveer Science Academy values your trust and is committed
                            to protecting your personal information. By using our website,
                            online tests, and educational services, you agree to the practices
                            described in this Privacy Policy.
                        </p>

                    </section>

                    {/* INFORMATION */}

                    <section className="mb-14">

                        <h2 className="text-3xl font-bold mb-6 text-violet-600 dark:text-violet-400">
                            Information We Collect
                        </h2>

                        <div className="grid md:grid-cols-2 gap-5">

                            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                <h3 className="font-semibold text-lg mb-2">
                                    Personal Information
                                </h3>

                                <p className="text-slate-600 dark:text-slate-300">
                                    Name, email address, phone number, and student details.
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                <h3 className="font-semibold text-lg mb-2">
                                    Academic Information
                                </h3>

                                <p className="text-slate-600 dark:text-slate-300">
                                    Test scores, exam performance, and academic progress.
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                <h3 className="font-semibold text-lg mb-2">
                                    Login Data
                                </h3>

                                <p className="text-slate-600 dark:text-slate-300">
                                    Authentication details and account access activity.
                                </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                <h3 className="font-semibold text-lg mb-2">
                                    Device & Usage Data
                                </h3>

                                <p className="text-slate-600 dark:text-slate-300">
                                    Browser information, analytics, and website interactions.
                                </p>
                            </div>

                        </div>

                    </section>

                    {/* USAGE */}

                    <section className="mb-14">

                        <h2 className="text-3xl font-bold mb-5 text-violet-600 dark:text-violet-400">
                            How We Use Information
                        </h2>

                        <div className="space-y-4">

                            {[
                                "Provide coaching and educational services",
                                "Manage online tests and student accounts",
                                "Improve learning experience and website performance",
                                "Send academic updates and important notifications",
                                "Maintain security and prevent unauthorized access"
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

                    {/* SECURITY */}

                    <section className="mb-14">

                        <h2 className="text-3xl font-bold mb-5 text-violet-600 dark:text-violet-400">
                            Data Security
                        </h2>

                        <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">
                            We implement reasonable technical and organizational measures
                            to protect student data and prevent unauthorized access,
                            disclosure, or misuse of information.
                        </p>

                    </section>

                    {/* THIRD PARTY */}

                    <section className="mb-14">

                        <h2 className="text-3xl font-bold mb-5 text-violet-600 dark:text-violet-400">
                            Third-Party Services
                        </h2>

                        <p className="text-lg leading-8 text-slate-700 dark:text-slate-300">
                            Our platform may use trusted third-party services such as
                            Google Login, analytics tools, and hosting providers
                            to improve functionality and user experience.
                        </p>

                    </section>

                    {/* CONTACT */}

                    <section>

                        <h2 className="text-3xl font-bold mb-6 text-violet-600 dark:text-violet-400">
                            Contact Us
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