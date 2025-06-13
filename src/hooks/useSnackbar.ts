import { useState, useCallback } from 'react';
import { snackbarType } from '../interface/snackbar.interface';

export const useSnackbar = (initialState?: Partial<snackbarType>) => {
    const [snackbar, setSnackbar] = useState<snackbarType>({
        isOpen: false,
        message: '',
        status: 'success',
        ...initialState
    });

    const showSnackbar = useCallback((message: string, status: 'success' | 'error' = 'success') => {
        setSnackbar({
            isOpen: true,
            message,
            status
        });
    }, []);

    const hideSnackbar = useCallback(() => {
        setSnackbar(prev => ({
            ...prev,
            isOpen: false
        }));
    }, []);

    const showSuccess = useCallback((message: string) => {
        showSnackbar(message, 'success');
    }, [showSnackbar]);

    const showError = useCallback((message: string) => {
        showSnackbar(message, 'error');
    }, [showSnackbar]);

    return {
        snackbar,
        setSnackbar,
        showSnackbar,
        hideSnackbar,
        showSuccess,
        showError
    };
};
