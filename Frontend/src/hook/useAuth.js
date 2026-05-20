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
                // Agar session nahi hai, to error mat phenko, null return karo
                if (err.response?.status === 401) return null;
                throw err;
            }
        },
        staleTime: 1000 * 60 * 15, // Cache for 15 mins
        retry: false, // 401 aane par baar-baar retry mat karo
        refetchOnWindowFocus: false,
    });

    const logoutMutation = useMutation({
        mutationFn: () => apiClient.post('/auth/logout'),
        onSettled: () => {
            // Cache aur Storage ko total clear karo
            queryClient.clear();
            localStorage.clear();
            sessionStorage.clear();
            
            // Explicitly user ko null set karo taaki UI turant update ho
            queryClient.setQueryData(['authUser'], null);
            
            // Hard reload for clean state
            window.location.href = '/'; 
        }
    });

    const googleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
    };

    const loginUser = useMutation({
        mutationFn: (credentials) => apiClient.post('/auth/login', credentials),
        onSuccess: (res) => {
            queryClient.setQueryData(['authUser'], res.data.user || res.data);
        }
    });

    const updateProfile = useMutation({
        mutationFn: (payload) => apiClient.patch('/auth/update-profile', payload),
        onSuccess: (res) => {
            queryClient.setQueryData(['authUser'], res.data.user || res.data);
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
        logout: logoutMutation.mutate, 
        isLoggingOut: logoutMutation.isPending,
        verifyErp, 
        resetPassword, 
        updateProfile 
    };
};