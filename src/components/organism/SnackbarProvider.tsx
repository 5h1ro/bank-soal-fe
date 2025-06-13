import { Alert, Snackbar } from "@mui/material";
import { SnackbarProviderProps } from "../../types/test.types";
import { useSnackbar } from "../../hooks/useSnackbar";
import { createContext, useContext } from "react";

interface SnackbarContextType {
    showSuccess: (message: string) => void;
    showError: (message: string) => void;
    hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbarContext = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbarContext must be used within a SnackbarProvider');
    }
    return context;
};

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
    const { snackbar, hideSnackbar, showSuccess, showError } = useSnackbar();

    const contextValue: SnackbarContextType = {
        showSuccess,
        showError,
        hideSnackbar
    };

    return (
        <SnackbarContext.Provider value={contextValue}>
            {children}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbar.isOpen}
                autoHideDuration={6000}
                onClose={hideSnackbar}
            >
                <Alert
                    onClose={hideSnackbar}
                    className={`${
                        snackbar.status === 'success' ? 'bg-success-500' : 'bg-danger-500'
                    } w-[85vw] md:w-[496px]`}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export default SnackbarProvider;
