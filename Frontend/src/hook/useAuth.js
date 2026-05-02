// src/hooks/useAuth.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

export const useAuth = () => {
    const queryClient = useQueryClient();

    // --- 1. LOGIN (Cookies logic) ---
    const loginUser = useMutation({
        mutationFn: async (credentials) => {
            // Backend automatically cookie set kar dega browser mein
            const { data } = await apiClient.post('/auth/login', credentials);
            return data;
        },
        onSuccess: () => {
            // Profile cache ko refresh karo taaki naya user data fetch ho jaye
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
        }
    });

    // --- 2. REGISTER ---
    const registerUser = useMutation({
        mutationFn: async (userData) => {
            const { data } = await apiClient.post('/auth/register', userData);
            return data;
        }
    });

    const resetPassword = useMutation({
        mutationFn: async (userData) => {
            // userData mein { email, erpId, newPassword } hoga
            const { data } = await apiClient.post('/auth/reset-password', userData);
            return data;
        }
    });

    // --- 3. GET PROFILE (ME) ---
    // Ye hook '/auth/me' hit karega, browser automatically cookie sath bhejega
    const useProfile = () => useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            const { data } = await apiClient.get('/auth/me');
            return data;
        },
        staleTime: 1000 * 60 * 15, // 15 minutes cache
        retry: false, // Unauthorized hone par baar-baar hit mat karo
    });

    // --- 4. LOGOUT ---
    const logoutUser = useMutation({
        mutationFn: async () => {
            await apiClient.post('/auth/logout');
        },
        onSuccess: () => {
            // Pura cache saaf kar do taaki purana user data na dikhe
            queryClient.clear();
            window.location.href = '/login';
        }
    });

    const verifyErp = useMutation({
        mutationFn: async (payload) => {
            // payload mein { erpId, role } hoga
            const { data } = await apiClient.post('/auth/verify-erp', payload);
            return data;
        }
    });

    return { loginUser, registerUser, useProfile, logoutUser, verifyErp,resetPassword };
};



