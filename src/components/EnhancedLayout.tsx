import React from 'react';
import Layout from './Layout';
import SnackbarProvider from './organism/SnackbarProvider';
import { props } from '../interface/props.interface';

interface EnhancedLayoutProps extends props {
    children: React.ReactNode;
}

/**
 * Enhanced Layout that includes global snackbar provider
 * This eliminates the need for individual snackbar implementations in each page
 */
const EnhancedLayout: React.FC<EnhancedLayoutProps> = ({ children, ...layoutProps }) => {
    return (
        <SnackbarProvider>
            <Layout {...layoutProps}>
                {children}
            </Layout>
        </SnackbarProvider>
    );
};

export default EnhancedLayout;
