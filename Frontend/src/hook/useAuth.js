import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

export const useAuth = () => {
    const queryClient = useQueryClient();

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            try {
                const { data } = await apiClient.get('/auth/me');
                
                localStorage.setItem("isLoggedIn", "true");
                
                return data;
            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.removeItem("isLoggedIn");
                    return null;
                }
                throw err;
            }
        },
      
        enabled: true, 
        staleTime: 1000 * 60 * 15,
        retry: false,
        refetchOnWindowFocus: false,
    });
    // 2. LOGIN MUTATION
    const loginUser = useMutation({
        mutationFn: async (credentials) => {
            const { data } = await apiClient.post('/auth/login', credentials);
            return data;
        },
        onSuccess: (data) => {
        localStorage.setItem("isLoggedIn", "true");
            const loggedInUser = data.user || data;
            queryClient.setQueryData(['authUser'], loggedInUser);
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
        }
    });

    // 3. LOGOUT MUTATION
    const logout = useMutation({
        mutationFn: async () => await apiClient.post('/auth/logout'),
        onSettled: () => {
            localStorage.clear();
            sessionStorage.clear();
            queryClient.removeQueries({ queryKey: ['authUser'] });
            window.location.href = '/'; 
        }
    });

    // 4. UPDATE PROFILE MUTATION
    const updateProfile = useMutation({
        mutationFn: async (payload) => {
            const { data } = await apiClient.patch('/auth/update-profile', payload);
            return data;
        },
        onSuccess: (response) => {
            const updatedUser = response.user || response;
            queryClient.setQueryData(['authUser'], updatedUser);
        }
    });

    // 5. REGISTER MUTATION
    const registerUser = useMutation({
        mutationFn: async (userData) => {
            const { data } = await apiClient.post('/auth/register', userData);
            return data;
        }
    });

    // 6. RESET PASSWORD MUTATION
    const resetPassword = useMutation({
        mutationFn: async (userData) => {
            const { data } = await apiClient.post('/auth/reset-password', userData);
            return data;
        }
    });

    // 7. ERP VERIFICATION MUTATION
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
        logout: logout.mutate, // logout.mutate() call karein
        registerUser, 
        verifyErp, 
        resetPassword, 
        updateProfile 
    };
};