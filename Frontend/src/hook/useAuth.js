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

    const googleLogin = useMutation({
        mutationFn: () => {
            window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
        }
    });

    const logoutMutation = useMutation({
        mutationFn: () => apiClient.post('/auth/logout'),
        onSettled: () => {
            // 1. React Query ka cache saaf karo
            queryClient.clear(); 
            
            // 2. Storage saaf karo
            localStorage.clear();
            sessionStorage.clear();
            
            // 3. IMPORTANT: Auth state ko explicitly null set karo
            queryClient.setQueryData(['authUser'], null);
            
            // 4. Page refresh karo taaki koi stale component mount na rahe
            window.location.href = '/'; 
        }
    });

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
        verifyErp, 
        resetPassword, 
        updateProfile ,
        googleLogin,
        logout: logoutMutation.mutate, 
    isLoggingOut: logoutMutation.isPending
    };
};