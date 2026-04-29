import React, { useState, memo } from 'react';
import { Fingerprint, Search, CheckCircle } from 'lucide-react';

const ERPVerifyCard = memo(() => {
    const [erpId, setErpId] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-blue-500/30">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <Fingerprint size={20} />
                </div>
                <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tighter">Admin ERPID Verification</h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <input 
                    type="text" 
                    value={erpId}
                    onChange={(e) => setErpId(e.target.value)}
                    placeholder="Enter Admin ERPID..."
                    className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 outline-none font-bold transition-all text-sm"
                />
                <button 
                    onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1000); }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                >
                    {loading ? 'Verifying...' : 'Authenticate'}
                </button>
            </div>
        </div>
    );
});

export default ERPVerifyCard;