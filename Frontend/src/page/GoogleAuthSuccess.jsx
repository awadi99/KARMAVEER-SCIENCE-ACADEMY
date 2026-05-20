import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/apiClient.js";

const GoogleAuthSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        const token = searchParams.get("token");
        const redirectPath = searchParams.get("redirect") || "/dashboard";

        if (!token) {
            navigate("/login?error=auth_failed", { replace: true });
            return;
        }

        localStorage.setItem("jwt", token);

        apiClient.get("/auth/me")
            .then(({ data }) => {
                queryClient.setQueryData(["authUser"], data);
                // Added a small delay to ensure the UI feels polished
                setTimeout(() => navigate(redirectPath, { replace: true }), 1000);
            })
            .catch(() => {
                localStorage.removeItem("jwt");
                navigate("/login?error=auth_failed", { replace: true });
            });
    }, []);

    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#0a0f1d] p-6 text-center">
            {/* Logo Container - Optimized with hardware acceleration */}
            <div className="w-24 h-24 mb-8 bg-[#1e293b] rounded-3xl border border-[#334155] flex items-center justify-center transform transition-all duration-500 animate-pulse">
                <span className="text-white font-black text-2xl tracking-widest">KSA</span>
            </div>
            
            {/* Status Text */}
            <div className="space-y-2">
                <h2 className="text-white font-bold text-xl sm:text-2xl">Authenticating...</h2>
                <p className="text-slate-500 text-sm">Please wait while we set up your session.</p>
            </div>

            {/* Simple Loading Bar - Pure CSS, No Lag */}
            <div className="w-48 sm:w-64 h-1 mt-8 bg-[#1e293b] rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 animate-[loading_1.5s_ease-in-out_infinite]"></div>
            </div>

            {/* Custom Keyframe for smooth animation */}
            <style jsx>{`
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default GoogleAuthSuccess;