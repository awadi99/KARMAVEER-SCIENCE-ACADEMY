import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'; 
import { toast } from 'react-toastify'; 

const api = axios.create({
    baseURL: 'https://karmaveer-science-academy.onrender.com',
    withCredentials: true 
});

api.interceptors.request.use((config) => {
    // 🚨 Ensure this key matches your login logic (jwt or token)
    const token = localStorage.getItem('jwt'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const useUser = (filters = {}) => {
    const queryClient = useQueryClient();

    const studentsQuery = useQuery({
        queryKey: ['students', filters],
        queryFn: async () => {
            const { data } = await api.get('/api/user/students', { params: filters });
            return data;
        },
        staleTime: 1000 * 60 * 5, 
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/api/user/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['students']);
            toast.success("Student deleted successfully!");
        },
        onError: (error) => {
            if (error.response?.status === 401) {
                toast.error("Session expired. Please login again.");
            } else {
                toast.error(error.response?.data?.message || "Delete failed");
            }
        }
    });

    return {
        students: studentsQuery.data?.students || [],
        total: studentsQuery.data?.total || 0,
        isLoading: studentsQuery.isLoading,
        isError: studentsQuery.isError,
        deleteStudent: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending
    };
};