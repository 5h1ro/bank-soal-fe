import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Typography, CircularProgress } from '@mui/material';
import PageHeader from '../molecules/PageHeader';
import { DetailPageProps } from '../../types/test.types';

interface DetailPageTemplateProps extends DetailPageProps {
    children: React.ReactNode;
    loading?: boolean;
    error?: string | null;
    loadingComponent?: React.ReactNode;
    errorComponent?: React.ReactNode;
    emptyComponent?: React.ReactNode;
    headerActions?: React.ReactNode;
}

/**
 * Reusable template for detail pages
 * Provides consistent layout, loading states, and error handling
 */
const DetailPageTemplate: React.FC<DetailPageTemplateProps> = ({
    title = 'Detail',
    backPath,
    onBack,
    children,
    loading = false,
    error = null,
    data,
    loadingComponent,
    errorComponent,
    emptyComponent,
    headerActions
}) => {
    // Default loading component
    const defaultLoadingComponent = (
        <Grid2 className="bg-base-white rounded-lg p-6" xs={12}>
            <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6 mb-4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
        </Grid2>
    );

    // Default error component
    const defaultErrorComponent = (
        <Grid2 className="bg-base-white rounded-lg p-6" xs={12}>
            <div className="text-center py-8">
                <Typography color="error" className="mb-4">
                    {error || 'Terjadi kesalahan saat memuat data'}
                </Typography>
                <button 
                    onClick={() => window.location.reload()}
                    className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
                >
                    Muat Ulang
                </button>
            </div>
        </Grid2>
    );

    // Default empty component
    const defaultEmptyComponent = (
        <Grid2 className="bg-base-white rounded-lg p-6" xs={12}>
            <div className="text-center py-8">
                <Typography className="text-gray-500">
                    Data tidak ditemukan
                </Typography>
            </div>
        </Grid2>
    );

    return (
        <>
            <PageHeader 
                title={title} 
                backPath={backPath}
                onBack={onBack}
                rightContent={headerActions}
            />
            
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                {loading ? (
                    loadingComponent || defaultLoadingComponent
                ) : error ? (
                    errorComponent || defaultErrorComponent
                ) : !data ? (
                    emptyComponent || defaultEmptyComponent
                ) : (
                    children
                )}
            </Grid2>
        </>
    );
};

export default DetailPageTemplate;
