import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Chip, Button, Divider } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { RiDownloadLine, RiPrintLine } from '@remixicon/react';
import moment from 'moment';

// Optimized imports
import { withDetailPage, usePageUtils } from '../../../hoc/withPageEnhancements';
import DetailPageTemplate from '../../../components/templates/DetailPageTemplate';
import { usePageData } from '../../../hooks/usePageData';
import { ROUTES, PAGE_TITLES } from '../../../constants/routes';
import Currency from '../../../components/atoms/Currency';

interface TransaksiDetailData {
    id: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    date: string;
    description: string;
    user_name: string;
    user_email: string;
    payment_method: string;
    transaction_fee: number;
    net_amount: number;
    reference_number: string;
    notes?: string;
}

const TransaksiDetailOptimized: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { showSuccess, showError } = usePageUtils();

    const { data, loading, error } = usePageData<TransaksiDetailData>(
        async () => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            return {
                id: id || '1',
                amount: 300000,
                status: 'completed',
                date: '2023-08-17 10:30:00',
                description: 'Pembayaran tes CFIT (Culture Fair Intelligence Test)',
                user_name: 'John Doe',
                user_email: 'johndoe@example.com',
                payment_method: 'Transfer Bank BCA',
                transaction_fee: 5000,
                net_amount: 295000,
                reference_number: 'TRX-2023081700001',
                notes: 'Pembayaran berhasil diverifikasi'
            };
        },
        { dependencies: [id] }
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'success';
            case 'pending': return 'warning';
            case 'failed': return 'error';
            case 'cancelled': return 'default';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed': return 'Selesai';
            case 'pending': return 'Pending';
            case 'failed': return 'Gagal';
            case 'cancelled': return 'Dibatalkan';
            default: return 'Tidak Diketahui';
        }
    };

    const handleDownloadReceipt = () => {
        showSuccess('Receipt berhasil didownload');
        // Implement actual download logic
    };

    const handlePrintReceipt = () => {
        showSuccess('Receipt berhasil dicetak');
        // Implement actual print logic
    };

    const headerActions = (
        <div className="flex gap-2">
            <Button
                variant="outlined"
                startIcon={<RiPrintLine className="w-4 h-4" />}
                onClick={handlePrintReceipt}
                size="small"
            >
                Cetak
            </Button>
            <Button
                variant="contained"
                startIcon={<RiDownloadLine className="w-4 h-4" />}
                onClick={handleDownloadReceipt}
                size="small"
            >
                Download
            </Button>
        </div>
    );

    return (
        <DetailPageTemplate
            title={PAGE_TITLES.TRANSAKSI_DETAIL}
            backPath={ROUTES.TRANSAKSI}
            data={data}
            loading={loading}
            error={error}
            headerActions={headerActions}
        >
            {data && (
                <>
                    {/* Transaction Status */}
                    <Grid2 className="bg-base-white rounded-lg p-6 mb-4" xs={12}>
                        <div className="flex justify-between items-center mb-4">
                            <Typography variant="h6">Status Transaksi</Typography>
                            <Chip 
                                label={getStatusLabel(data.status)}
                                color={getStatusColor(data.status) as any}
                                size="medium"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Typography variant="body2" color="textSecondary">
                                    ID Transaksi
                                </Typography>
                                <Typography variant="body1" className="font-semibold">
                                    #{data.id}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="body2" color="textSecondary">
                                    Nomor Referensi
                                </Typography>
                                <Typography variant="body1" className="font-semibold">
                                    {data.reference_number}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="body2" color="textSecondary">
                                    Tanggal Transaksi
                                </Typography>
                                <Typography variant="body1" className="font-semibold">
                                    {moment(data.date).format('DD MMMM YYYY, HH:mm')}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="body2" color="textSecondary">
                                    Metode Pembayaran
                                </Typography>
                                <Typography variant="body1" className="font-semibold">
                                    {data.payment_method}
                                </Typography>
                            </div>
                        </div>
                    </Grid2>

                    {/* User Information */}
                    <Grid2 className="bg-base-white rounded-lg p-6 mb-4" xs={12}>
                        <Typography variant="h6" className="mb-4">
                            Informasi Pengguna
                        </Typography>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Typography variant="body2" color="textSecondary">
                                    Nama Lengkap
                                </Typography>
                                <Typography variant="body1" className="font-semibold">
                                    {data.user_name}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="body2" color="textSecondary">
                                    Email
                                </Typography>
                                <Typography variant="body1" className="font-semibold">
                                    {data.user_email}
                                </Typography>
                            </div>
                        </div>
                    </Grid2>

                    {/* Transaction Details */}
                    <Grid2 className="bg-base-white rounded-lg p-6 mb-4" xs={12}>
                        <Typography variant="h6" className="mb-4">
                            Detail Transaksi
                        </Typography>
                        <div className="space-y-3">
                            <div>
                                <Typography variant="body2" color="textSecondary">
                                    Deskripsi
                                </Typography>
                                <Typography variant="body1" className="font-semibold">
                                    {data.description}
                                </Typography>
                            </div>
                            
                            <Divider className="my-4" />
                            
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Typography color="textSecondary">
                                        Jumlah Pembayaran
                                    </Typography>
                                    <Typography className="font-semibold">
                                        <Currency value={data.amount} />
                                    </Typography>
                                </div>
                                <div className="flex justify-between">
                                    <Typography color="textSecondary">
                                        Biaya Transaksi
                                    </Typography>
                                    <Typography className="font-semibold">
                                        <Currency value={data.transaction_fee} />
                                    </Typography>
                                </div>
                                <Divider />
                                <div className="flex justify-between">
                                    <Typography variant="h6">
                                        Total Diterima
                                    </Typography>
                                    <Typography variant="h6" className="font-bold text-primary-500">
                                        <Currency value={data.net_amount} />
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </Grid2>

                    {/* Notes */}
                    {data.notes && (
                        <Grid2 className="bg-base-white rounded-lg p-6" xs={12}>
                            <Typography variant="h6" className="mb-4">
                                Catatan
                            </Typography>
                            <Typography variant="body1">
                                {data.notes}
                            </Typography>
                        </Grid2>
                    )}
                </>
            )}
        </DetailPageTemplate>
    );
};

export default withDetailPage(TransaksiDetailOptimized);
