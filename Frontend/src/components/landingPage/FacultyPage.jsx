import React from "react";
import FACULTY_DATA from '../../constants/facultyData.js';

export default function FacultyPage() {
    return (
        <div className="w-full min-h-screen bg-[#F9FAFB] dark:bg-[#0F172A] transition-colors duration-300 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Meet Our Faculty
                    </h2>
                </div>

                {/* Medium size grid: cards are now 360px wide */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 justify-items-center">
                    {FACULTY_DATA.map((faculty, index) => (
                        <div 
                            key={index}
                            className="w-full max-w-[360px] bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {/* Profile Image: Medium Size (30-32 size is comfortable) */}
                            <div className="w-30 h-30 mb-6 rounded-2xl overflow-hidden mx-auto shadow-md">
                                {faculty.img ? (
                                    <img 
                                        src={faculty.img} 
                                        alt={faculty.name} 
                                        className="w-30 h-30 object-cover aspect-square" 
                                    />
                                ) : (
                                    <div className="w-30 h-30 flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-500 font-bold text-4xl">
                                        {faculty.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 text-center">
                                {faculty.name}
                            </h3>
                            
                            {faculty.qual && (
                                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-5 text-center">
                                    {faculty.qual}
                                </p>
                            )}

                            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300 pt-5 border-t border-slate-100 dark:border-slate-700">
                                {faculty.exp && (
                                    <p><span className="font-semibold text-slate-900 dark:text-white">Exp:</span> {faculty.exp}</p>
                                )}
                                {faculty.expertise && (
                                    <p><span className="font-semibold text-slate-900 dark:text-white">Expertise:</span> {faculty.expertise}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}