import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import { toast } from 'react-toastify';

export const useTest = () => {
    const queryClient = useQueryClient();

    // 1. UPLOAD TEST (Mutation)
    const uploadTest = useMutation({
        mutationFn: async (payload) => {
            const { data } = await apiClient.post('/test/upload-set', payload);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Questions Uploaded!");
            // Purane stats ya schedules ko invalidate karein taaki data refresh ho jaye
            queryClient.invalidateQueries({ queryKey: ['testSchedules'] });
        },
        onError: (err) => {
            const errorMsg = err.response?.data?.message || "Upload Failed";
            toast.error(errorMsg);
        }
    });
    // 2. GET TEST STATS (Fail/Absent Logic)
    const getStats = (testId, standard) => {
        return useQuery({
            queryKey: ['testStats', testId, standard],
            queryFn: async () => {
                const { data } = await apiClient.get(`/questions/stats`, {
                    params: { testId, standard }
                });
                return data;
            },
            enabled: !!testId && !!standard, // Jab tak ID na ho, call mat karo
            staleTime: 1000 * 60 * 5, // 5 minutes cache
        });
    };

    // 3. GET ALL SCHEDULED TESTS (Admin View)
    const { data: schedules, isLoading: loadingSchedules } = useQuery({
        queryKey: ['testSchedules'],
        queryFn: async () => {
            const { data } = await apiClient.get('/test/schedules');
            return data;
        },
        staleTime: 1000 * 60 * 10,
    });

    // 4. SUBMIT STUDENT ANSWERS
    const submitResult = useMutation({
        mutationFn: async (payload) => {
            const { data } = await apiClient.post('/test/submit', payload);
            return data;
        },
        onSuccess: () => {
            toast.success("Test Submitted Successfully!");
        }
    });

    return {
        uploadTest,
        getStats,
        schedules,
        loadingSchedules,
        submitResult
    };
};