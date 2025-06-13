import React from 'react';
import { useParams } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Typography, Button, Chip } from '@mui/material';
import { RiDownloadLine, RiEditLine } from '@remixicon/react';

// Optimized imports
import { withDetailPage, usePageUtils } from '../../../hoc/withPageEnhancements';
import DetailPageTemplate from '../../../components/templates/DetailPageTemplate';
import TestCard from '../../../components/molecules/TestCard';
import { usePageData } from '../../../hooks/usePageData';
import { ROUTES, PAGE_TITLES } from '../../../constants/routes';
import { CFIT_TEST_DATA, getTestById } from '../../../constants/testData';
import { TestData } from '../../../types/test.types';

/**
 * Optimized Order Detail component using new architecture
 * This demonstrates how to use the global optimization system
 */
const OrderDetailOptimized: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { showSuccess, showError, goToEdit } = usePageUtils();

    // Use the global page data hook
    const {
        data: orderData,
        loading,
        error,
        refetch
    } = usePageData<TestData>(
        async () => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            const data = id ? getTestById(id) : CFIT_TEST_DATA;
            if (!data) {
                throw new Error('Data tidak ditemukan');
            }
            return data;
        },
        {
            fetchOnMount: true,
            dependencies: [id]
        }
    );

    const handleDownload = () => {
        showSuccess('Download dimulai!');
        // Implement actual download logic
    };

    const handleEdit = () => {
        if (orderData?.id) {
            goToEdit('order', orderData.id);
        }
    };

    const headerActions = (
        <div className="flex gap-2">
            <Button
                variant="outlined"
                startIcon={<RiEditLine className="w-4 h-4" />}
                onClick={handleEdit}
                size="small"
            >
                Edit
            </Button>
            <Button
                variant="contained"
                startIcon={<RiDownloadLine className="w-4 h-4" />}
                onClick={handleDownload}
                size="small"
            >
                Download
            </Button>
        </div>
    );

    return (
        <DetailPageTemplate
            title={PAGE_TITLES.ORDER_DETAIL}
            backPath={ROUTES.ORDER}
            data={orderData}
            loading={loading}
            error={error}
            headerActions={headerActions}
        >
            {orderData && (
                <>
                    {/* Order Status */}
                    <Grid2 className="bg-base-white rounded-lg p-6 mb-4" xs={12}>
                        <div className="flex justify-between items-center mb-4">
                            <Typography variant="h6">Status Order</Typography>
                            <Chip 
                                label="Aktif" 
                                color="success" 
                                size="small"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Typography variant="body2" color="textSecondary">
                                    Order ID
                                </Typography>
                                <Typography variant="body1" className="font-semibold">
                                    {orderData.id}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="body2" color="textSecondary">
                                    Tanggal Order
                                </Typography>
                                <Typography variant="body1" className="font-semibold">
                                    {new Date().toLocaleDateString('id-ID')}
                                </Typography>
                            </div>
                        </div>
                    </Grid2>

                    {/* Test Information */}
                    <TestCard 
                        test={orderData} 
                        onDownload={handleDownload} 
                    />

                    {/* Additional Information */}
                    <Grid2 className="bg-base-white rounded-lg p-6 mt-4" xs={12}>
                        <Typography variant="h6" className="mb-4">
                            Informasi Tambahan
                        </Typography>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Typography color="textSecondary">
                                    Metode Pembayaran
                                </Typography>
                                <Typography className="font-semibold">
                                    Transfer Bank
                                </Typography>
                            </div>
                            <div className="flex justify-between">
                                <Typography color="textSecondary">
                                    Status Pembayaran
                                </Typography>
                                <Chip label="Lunas" color="success" size="small" />
                            </div>
                            <div className="flex justify-between">
                                <Typography color="textSecondary">
                                    Estimasi Selesai
                                </Typography>
                                <Typography className="font-semibold">
                                    {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID')}
                                </Typography>
                            </div>
                        </div>
                    </Grid2>
                </>
            )}
        </DetailPageTemplate>
    );
};

// Export with HOC wrapper for global enhancements
export default withDetailPage(OrderDetailOptimized);
