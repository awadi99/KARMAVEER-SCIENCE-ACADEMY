import React, { useState, useMemo, useCallback, memo } from 'react';
import { 
    Trash2, CheckCircle2, Clock, IndianRupee, Search, 
    PlusCircle, Edit3, X, Save, UserCircle, Hash 
} from 'lucide-react';

// Sub-component for individual rows to prevent table-wide re-renders
const StudentRow = memo(({ student, onEdit, onDelete }) => (
    <tr className="group hover:bg-slate-50/50 dark:hover:bg-blue-500/5 transition-all duration-200">
        <td className="p-4 md:p-6">
            <div className="flex items-center gap-4">
                <div className="h-11 w-11 shrink-0 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center font-bold text-blue-600 shadow-sm">
                    {student.name.charAt(0)}
                </div>
                <div className="min-w-0">
                    <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{student.name}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter flex items-center gap-1">
                        <Hash size={10}/> {student.roll}
                    </p>
                </div>
            </div>
        </td>
        <td className="p-4 md:p-6">
            <div className="flex flex-col">
                <span className="font-black text-slate-700 dark:text-slate-200 flex items-center text-sm">
                    <IndianRupee size={12}/>{student.amount}
                </span>
                <span className="text-[9px] text-slate-400 font-bold uppercase">{student.date}</span>
            </div>
        </td>
        <td className="p-4 md:p-6">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight transition-colors ${
                student.status === 'completed' 
                ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' 
                : 'text-amber-600 bg-amber-50 dark:bg-amber-500/10'
            }`}>
                {student.status === 'completed' ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                {student.status}
            </span>
        </td>
        <td className="p-4 md:p-6 text-right">
            <div className="flex justify-end gap-1">
                <button 
                    onClick={() => onEdit(student)}
                    className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-all active:scale-90"
                >
                    <Edit3 size={18}/>
                </button>
                <button 
                    onClick={() => onDelete(student.id)}
                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all active:scale-90"
                >
                    <Trash2 size={18}/>
                </button>
            </div>
        </td>
    </tr>
));

const FeesList = memo(() => {
    const [students, setStudents] = useState([
        { id: 1, name: "Arjun Mehta", roll: "2026-A10", amount: 5000, status: "completed", date: "20 April" },
        { id: 2, name: "Sneha Patil", roll: "2026-A11", amount: 5000, status: "pending", date: "---" },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [formData, setFormData] = useState({ name: '', roll: '', amount: '', status: 'pending' });

    const filteredData = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();
        return students.filter(s => 
            s.name.toLowerCase().includes(lowerSearch) || s.roll.toLowerCase().includes(lowerSearch)
        );
    }, [searchTerm, students]);

    const openModal = useCallback((student = null) => {
        if (student) {
            setEditingStudent(student);
            setFormData({ ...student });
        } else {
            setEditingStudent(null);
            setFormData({ name: '', roll: '', amount: '', status: 'pending' });
        }
        setIsModalOpen(true);
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        if (editingStudent) {
            setStudents(prev => prev.map(s => s.id === editingStudent.id ? { ...formData, id: s.id } : s));
        } else {
            const newRecord = { 
                ...formData, 
                id: Date.now(), 
                date: formData.status === 'completed' ? new Date().toLocaleDateString('en-GB', {day:'numeric', month:'short'}) : '---' 
            };
            setStudents(prev => [newRecord, ...prev]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = useCallback((id) => {
        if (window.confirm("Are you sure? This action cannot be undone.")) {
            setStudents(prev => prev.filter(s => s.id !== id));
        }
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
            
            {/* STICKY HEADER AREA */}
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-slate-50/50 dark:bg-slate-900/50 p-2 rounded-[2.5rem] sticky top-0 z-40 backdrop-blur-md border border-white/20 dark:border-slate-800/50">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Quick search by name or roll..." 
                        className="w-full pl-14 pr-6 py-4 rounded-[2rem] border-none bg-white dark:bg-slate-800 shadow-inner outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold text-sm"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button 
                    onClick={() => openModal()}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-[2rem] font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all whitespace-nowrap"
                >
                    <PlusCircle size={20} /> Add Fee
                </button>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
                
                {/* Desktop View: Visible from md upwards */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-100 dark:border-slate-800">
                                <th className="p-6">Student Info</th>
                                <th className="p-6">Amount</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Management</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {filteredData.map(student => (
                                <StudentRow key={student.id} student={student} onEdit={openModal} onDelete={handleDelete} />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View: Visible below md */}
                <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredData.map(student => (
                        <div key={student.id} className="p-5 flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-600">{student.name.charAt(0)}</div>
                                    <div>
                                        <p className="font-bold text-slate-800 dark:text-white text-sm">{student.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{student.roll}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => openModal(student)} className="p-2 text-slate-400"><Edit3 size={18}/></button>
                                    <button onClick={() => handleDelete(student.id)} className="p-2 text-slate-400"><Trash2 size={18}/></button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl">
                                <span className="font-black text-slate-700 dark:text-slate-200 flex items-center text-sm"><IndianRupee size={12}/>{student.amount}</span>
                                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${student.status === 'completed' ? 'text-emerald-600 bg-emerald-100/50' : 'text-amber-600 bg-amber-100/50'}`}>
                                    {student.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredData.length === 0 && (
                    <div className="p-20 text-center flex flex-col items-center gap-2">
                        <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-2">
                            <Search size={32} />
                        </div>
                        <p className="text-slate-500 font-bold">No records found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/70 backdrop-blur-sm transition-all">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                                    {editingStudent ? <Edit3 className="text-blue-600"/> : <PlusCircle className="text-blue-600"/>}
                                    {editingStudent ? 'Edit Fee' : 'New Entry'}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><X size={24}/></button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest flex items-center gap-1"><UserCircle size={12}/> Student Name</label>
                                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all font-bold" placeholder="e.g. Rahul Kumar" />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest flex items-center gap-1"><Hash size={12}/> Roll No</label>
                                        <input required type="text" value={formData.roll} onChange={(e) => setFormData({...formData, roll: e.target.value})} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold uppercase" placeholder="2026-X" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest flex items-center gap-1"><IndianRupee size={12}/> Amount</label>
                                        <input required type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold" placeholder="5000" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Payment Status</label>
                                    <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                                        {['pending', 'completed'].map(status => (
                                            <button key={status} type="button" onClick={() => setFormData({...formData, status})} className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase transition-all ${formData.status === status ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-md scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}>
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-[1.8rem] font-black uppercase tracking-widest shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-3 mt-6">
                                    <Save size={20}/> {editingStudent ? 'Update Database' : 'Confirm Entry'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

export default FeesList;