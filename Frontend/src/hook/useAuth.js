import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

export const useAuth = () => {
    const queryClient = useQueryClient();

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            try {
                const { data } = await apiClient.get('/auth/me');
                return data;
            } catch (err) {
                if (err.response?.status === 401) return null;
                throw err;
            }
        },
        staleTime: 1000 * 60 * 15,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const logout = async () => {
        try {
            // 1. Backend ko call karo
            await apiClient.post('/auth/logout');
        } catch (err) {
            console.error("Logout API failed", err);
        } finally {
            // 2. Clear everything manually
            queryClient.clear();
            sessionStorage.clear();
            localStorage.clear();
            
            // 3. Force Hard Reload to landing page
            window.location.href = '/'; 
        }
    };

    const loginUser = useMutation({
        mutationFn: async (credentials) => {
            const { data } = await apiClient.post('/auth/login', credentials);
            return data;
        },
        onSuccess: (data) => {
            const loggedInUser = data.user || data;
            queryClient.setQueryData(['authUser'], loggedInUser);
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
        }
    });

    const updateProfile = useMutation({
        mutationFn: async (payload) => {
            const { data } = await apiClient.patch('/auth/update-profile', payload);
            return data;
        },
        onSuccess: (response) => {
            const updatedUser = response.user || response;
            queryClient.setQueryData(['authUser'], updatedUser);
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
        }
    });

    const registerUser = useMutation({
        mutationFn: async (userData) => {
            const { data } = await apiClient.post('/auth/register', userData);
            return data;
        }
    });

    const resetPassword = useMutation({
        mutationFn: async (userData) => {
            const { data } = await apiClient.post('/auth/reset-password', userData);
            return data;
        }
    });

    const verifyErp = useMutation({
        mutationFn: async (payload) => {
            const { data } = await apiClient.post('/auth/verify-erp', payload);
            return data;
        }
    });

    return { 
        user, 
        isLoading, 
        isError, 
        loginUser, 
        registerUser, 
        logout, 
        verifyErp, 
        resetPassword, 
        updateProfile 
    };
};