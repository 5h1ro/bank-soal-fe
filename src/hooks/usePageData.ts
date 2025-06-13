import { useState, useEffect, useCallback } from 'react';
import { useSnackbarContext } from '../components/organism/SnackbarProvider';

interface UsePageDataOptions<T> {
    initialData?: T;
    fetchOnMount?: boolean;
    dependencies?: any[];
}

interface UsePageDataReturn<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    setData: (data: T | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    refetch: () => Promise<void>;
    reset: () => void;
}

/**
 * Custom hook for managing page data state
 * Provides consistent data loading, error handling, and state management
 */
export function usePageData<T = any>(
    fetchFunction?: () => Promise<T>,
    options: UsePageDataOptions<T> = {}
): UsePageDataReturn<T> {
    const {
        initialData = null,
        fetchOnMount = true,
        dependencies = []
    } = options;

    const [data, setData] = useState<T | null>(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const { showError } = useSnackbarContext();

    const fetchData = useCallback(async () => {
        if (!fetchFunction) return;

        try {
            setLoading(true);
            setError(null);
            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan';
            setError(errorMessage);
            showError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [fetchFunction, showError]);

    const reset = useCallback(() => {
        setData(initialData);
        setLoading(false);
        setError(null);
    }, [initialData]);

    useEffect(() => {
        if (fetchOnMount && fetchFunction) {
            fetchData();
        }
    }, [fetchOnMount, fetchData, ...dependencies]);

    return {
        data,
        loading,
        error,
        setData,
        setLoading,
        setError,
        refetch: fetchData,
        reset
    };
}

/**
 * Hook for managing list data with search and filter capabilities
 */
export function useListData<T = any>(
    fetchFunction?: (params?: any) => Promise<T[]>,
    options: UsePageDataOptions<T[]> = {}
) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<any>({});
    const [originalData, setOriginalData] = useState<T[]>([]);
    
    const pageData = usePageData<T[]>(
        fetchFunction ? () => fetchFunction({ search: searchQuery, ...filters }) : undefined,
        options
    );

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        // Trigger refetch with new search query
        if (fetchFunction) {
            pageData.refetch();
        }
    }, [fetchFunction, pageData]);

    const handleFilter = useCallback((newFilters: any) => {
        setFilters(newFilters);
        // Trigger refetch with new filters
        if (fetchFunction) {
            pageData.refetch();
        }
    }, [fetchFunction, pageData]);

    return {
        ...pageData,
        searchQuery,
        filters,
        originalData,
        setOriginalData,
        handleSearch,
        handleFilter
    };
}

/**
 * Hook for managing form data and submission
 */
export function useFormData<T = any>(
    submitFunction?: (data: T) => Promise<any>,
    initialData?: Partial<T>
) {
    const [formData, setFormData] = useState<Partial<T>>(initialData || {});
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const { showSuccess, showError } = useSnackbarContext();

    const updateField = useCallback((field: keyof T, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear field error when user starts typing
        if (errors[field as string]) {
            setErrors(prev => ({
                ...prev,
                [field as string]: ''
            }));
        }
    }, [errors]);

    const setFieldError = useCallback((field: keyof T, error: string) => {
        setErrors(prev => ({
            ...prev,
            [field as string]: error
        }));
    }, []);

    const clearErrors = useCallback(() => {
        setErrors({});
    }, []);

    const handleSubmit = useCallback(async (data?: T) => {
        if (!submitFunction) return;

        try {
            setSubmitting(true);
            clearErrors();
            const submitData = data || formData as T;
            const result = await submitFunction(submitData);
            showSuccess('Data berhasil disimpan');
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Gagal menyimpan data';
            showError(errorMessage);
            throw err;
        } finally {
            setSubmitting(false);
        }
    }, [submitFunction, formData, showSuccess, showError, clearErrors]);

    const reset = useCallback(() => {
        setFormData(initialData || {});
        clearErrors();
        setSubmitting(false);
    }, [initialData, clearErrors]);

    return {
        formData,
        setFormData,
        updateField,
        submitting,
        errors,
        setFieldError,
        clearErrors,
        handleSubmit,
        reset
    };
}
