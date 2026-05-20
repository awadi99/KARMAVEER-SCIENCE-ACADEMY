import React, { memo, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Trash2, Loader2, Hash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';
import { useUser } from '../hooks/useUser';

const ListStudent = memo(({ searchTerm = '' }) => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const { students, isLoading, deleteStudent, isDeleting } = useUser();

    const filteredStudents = useMemo(() => {
        if (!searchTerm) return students;
        const lowerSearch = searchTerm.toLowerCase();
        return students.filter(s => 
            s.fullName?.toLowerCase().includes(lowerSearch) ||
            s.erpId?.toLowerCase().includes(lowerSearch) ||
            s.email?.toLowerCase().includes(lowerSearch)
        );
    }, [searchTerm, students]);

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center p-12 space-y-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-slate-400 text-sm font-medium">Loading students...</p>
        </div>
    );

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {filteredStudents.map((student) => (
                    <div key={student._id} className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-transform">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                                    {student.fullName?.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{student.fullName}</h4>
                                    <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                                        <Hash size={10} /> {student.erpId}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => { setSelectedStudent(student); setIsModalOpen(true); }}
                                className="p-2.5 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-xl active:bg-red-100 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800">
                            <div className="flex flex-col">
                                <span className="text-[9px] uppercase text-slate-400 font-bold tracking-wider">Class</span>
                                <span className="text-xs font-bold text-blue-600">{student.standard}th Standard</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] uppercase text-slate-400 font-bold tracking-wider">Stream</span>
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{student.stream || student.subjectGroup || 'General'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden md:block overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-sm">
                <table className="w-full text-left border-collapse" style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-[11px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800">
                            <th className="px-6 py-5">Student</th>
                            <th className="px-6 py-5">ERP ID</th>
                            <th className="px-6 py-5">Academic Info</th>
                            <th className="px-6 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredStudents.map((student) => (
                            <tr key={student._id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/10">
                                            {student.fullName?.charAt(0)}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{student.fullName}</span>
                                            <span className="text-[11px] text-slate-500 truncate">{student.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs font-mono font-bold text-slate-500">#{student.erpId}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-blue-600">Class {student.standard}th</span>
                                        <span className="text-[10px] uppercase font-black text-slate-400">{student.stream || 'N/A'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => { setSelectedStudent(student); setIsModalOpen(true); }}
                                        className="p-2 text-slate-300 hover:text-red-600 transition-colors active:scale-90"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredStudents.length === 0 && (
                <div className="py-20 text-center rounded-[2rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
                    <p className="text-slate-400 font-medium text-sm">No students found matching your search.</p>
                </div>
            )}

            <ConfirmModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => deleteStudent(selectedStudent?._id)}
                title="Remove Student?"
                message={`Are you sure you want to delete ${selectedStudent?.fullName}?`}
                isLoading={isDeleting}
            />
        </div>
    );
});

export default ListStudent;