import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import { toast } from 'react-toastify';

export const useTest = () => {
    const queryClient = useQueryClient();

    
    const uploadTest = useMutation({
        mutationFn: async (payload) => {
            const { data } = await apiClient.post('/test/upload-set', payload);
            return data;
        },
        onSuccess: () => {
            toast.success("Test Questions Uploaded Successfully!");
            
            queryClient.invalidateQueries({ queryKey: ['testStats'] });
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Upload Failed");
        }
    });


    const submitResult = useMutation({
        mutationFn: async (payload) => {
            // payload example: { testId: "T-123", answers: [0, 2, 1] }
            const { data } = await apiClient.post('/test/submit', payload);
            return data;
        },
        onSuccess: (data) => {
            toast.success(`Submitted! Your Score: ${data.score}`);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Submission Error");
        }
    });


    const getStats = (testId, standard) => {
        return useQuery({
            queryKey: ['testStats', testId, standard],
            queryFn: async () => {
                const { data } = await apiClient.get('/test/stats', {
                    params: { testId, standard }
                });
                return data;
            },
            enabled: !!testId && !!standard, // Safety check
            staleTime: 1000 * 60 * 2, // 2 minutes cache is enough for live results
        });
    };

    return {
        uploadTest,
        submitResult,
        getStats
    };
};