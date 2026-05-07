import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import { toast } from 'react-toastify';

export const useTest = () => {
    const queryClient = useQueryClient();

    // 1. ADMIN: Upload Questions
    const uploadTest = useMutation({
        mutationFn: async (payload) => {
            const { data } = await apiClient.post('/test/upload-set', payload);
            return data;
        },
        onSuccess: () => {
            toast.success("Test Questions Uploaded Successfully!");
            queryClient.invalidateQueries({ queryKey: ['testStats'] });
            queryClient.invalidateQueries({ queryKey: ['studentTests'] }); 
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Upload Failed");
        }
    });


    const useStudentTests = (subject) => {
        return useQuery({
            queryKey: ['studentTests', subject],
            queryFn: async () => {
                const { data } = await apiClient.get('/test/list', {
                    params: { subject } 
                });
                return data.tests;
            },
            staleTime: 1000 * 60 * 5, 
        });
    };

    
    const useQuestions = (testId) => {
        return useQuery({
            queryKey: ['questions', testId],
            queryFn: async () => {
                const { data } = await apiClient.get(`/test/questions/${testId}`);
                return data.questions;
            },
            enabled: !!testId, 
            staleTime: Infinity, 
            cacheTime: 1000 * 60 * 30, 
        });
    };

    
    const submitResult = useMutation({
        mutationFn: async (payload) => {
            const { data } = await apiClient.post('/test/submit', payload);
            return data;
        },
        onSuccess: (data) => {
            toast.success(`Submitted! Your Score: ${data.score}`);
            
            queryClient.invalidateQueries({ queryKey: ['studentTests'] });
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
            enabled: !!testId && !!standard,
            staleTime: 1000 * 60 * 2,
        });
    };

    return {
        uploadTest,
        useStudentTests, 
        useQuestions,
        submitResult,
        getStats
    };
};