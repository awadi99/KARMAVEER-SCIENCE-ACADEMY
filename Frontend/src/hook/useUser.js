import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'; 
import { toast } from 'react-toastify'; 

export const useUser = (filters = {}) => {
    const queryClient = useQueryClient();

    // 1. GET Students Hook
    const studentsQuery = useQuery({
        queryKey: ['students', filters],
        queryFn: async () => {
            const { data } = await axios.get('/api/user/students', { params: filters });
            return data;
        },
        keepPreviousData: true,
        staleTime: 1000 * 60 * 5, 
    });


    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const { data } = await axios.delete(`/api/user/${id}`);
            return data;
        },
        onSuccess: () => {
            // Success hone par list ko background mein refresh kar do
            queryClient.invalidateQueries(['students']);
            toast.success("Student deleted successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Delete failed");
        }
    });

    return {
        students: studentsQuery.data?.students || [],
        total: studentsQuery.data?.total || 0,
        isLoading: studentsQuery.isLoading,
        isError: studentsQuery.isError,
        deleteStudent: deleteMutation.mutate,
        isDeleting: deleteMutation.isLoading
    };
};