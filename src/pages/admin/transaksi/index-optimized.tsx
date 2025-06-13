import React, { useState } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Chip, 
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import { RiMoreLine, RiEyeLine, RiEditLine, RiDeleteBinLine } from '@remixicon/react';
import moment from 'moment';

// Optimized imports
import { withListPage, usePageUtils } from '../../../hoc/withPageEnhancements';
import ListPageTemplate from '../../../components/templates/ListPageTemplate';
import { useListData } from '../../../hooks/usePageData';
import { ROUTES, PAGE_TITLES } from '../../../constants/routes';
import Currency from '../../../components/atoms/Currency';

interface TransaksiData {
    id: number;
    amount: number;
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    date: string;
    description: string;
    user_name: string;
    payment_method: string;
}

/**
 * Optimized Transaksi List component using new architecture
 */
const TransaksiOptimized: React.FC = () => {
    const { showSuccess, showError, goToDetail, goToEdit } = usePageUtils();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedTransaksi, setSelectedTransaksi] = useState<TransaksiData | null>(null);

    // Mock data - replace with actual API call
    const mockTransaksiData: TransaksiData[] = [
        {
            id: 1,
            amount: 300000,
            status: 'completed',
            date: '2023-08-17 10:30:00',
            description: 'Pembayaran tes CFIT',
            user_name: 'John Doe',
            payment_method: 'Transfer Bank'
        },
        {
            id: 2,
            amount: 250000,
            status: 'pending',
            date: '2023-08-18 14:15:00',
            description: 'Pembayaran tes DISC',
            user_name: 'Jane Smith',
            payment_method: 'E-Wallet'
        },
        {
            id: 3,
            amount: 150000,
            status: 'failed',
            date: '2023-08-19 09:45:00',
            description: 'Pembayaran tes Mini Stress',
            user_name: 'Bob Johnson',
            payment_method: 'Credit Card'
        },
        {
            id: 4,
            amount: 200000,
            status: 'cancelled',
            date: '2023-08-20 16:20:00',
            description: 'Pembayaran tes Critical Thinking',
            user_name: 'Alice Brown',
            payment_method: 'Transfer Bank'
        }
    ];

    // Use the global list data hook
    const {
        data: transaksiList,
        loading,
        error,
        handleSearch,
        refetch
    } = useListData<TransaksiData>(
        async (params) => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            let filteredData = mockTransaksiData;
            
            // Apply search filter
            if (params?.search) {
                filteredData = filteredData.filter(transaksi => 
                    transaksi.user_name.toLowerCase().includes(params.search.toLowerCase()) ||
                    transaksi.description.toLowerCase().includes(params.search.toLowerCase()) ||
                    transaksi.payment_method.toLowerCase().includes(params.search.toLowerCase())
                );
            }
            
            return filteredData;
        },
        {
            initialData: [],
            fetchOnMount: true
        }
    );

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, transaksi: TransaksiData) => {
        setAnchorEl(event.currentTarget);
        setSelectedTransaksi(transaksi);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedTransaksi(null);
    };

    const handleView = () => {
        if (selectedTransaksi) {
            goToDetail('transaksi', selectedTransaksi.id);
        }
        handleMenuClose();
    };

    const handleEdit = () => {
        if (selectedTransaksi) {
            goToEdit('transaksi', selectedTransaksi.id);
        }
        handleMenuClose();
    };

    const handleDelete = async () => {
        if (selectedTransaksi) {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                showSuccess(`Transaksi ${selectedTransaksi.id} berhasil dihapus`);
                refetch();
            } catch (error) {
                showError('Gagal menghapus transaksi');
            }
        }
        handleMenuClose();
    };

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

    return (
        <>
            <ListPageTemplate
                title={PAGE_TITLES.TRANSAKSI}
                data={transaksiList}
                loading={loading}
                error={error}
                onSearch={handleSearch}
                addable={false} // Transaksi tidak bisa ditambah manual
                searchPlaceholder="Cari transaksi..."
                emptyMessage="Belum ada transaksi"
            >
                <TableContainer component={Paper} className="rounded-lg">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Pengguna</TableCell>
                                <TableCell>Deskripsi</TableCell>
                                <TableCell>Jumlah</TableCell>
                                <TableCell>Metode Pembayaran</TableCell>
                                <TableCell>Tanggal</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transaksiList?.map((transaksi) => (
                                <TableRow key={transaksi.id} hover>
                                    <TableCell className="font-semibold">
                                        #{transaksi.id}
                                    </TableCell>
                                    <TableCell>{transaksi.user_name}</TableCell>
                                    <TableCell>{transaksi.description}</TableCell>
                                    <TableCell className="font-semibold">
                                        <Currency value={transaksi.amount} />
                                    </TableCell>
                                    <TableCell>{transaksi.payment_method}</TableCell>
                                    <TableCell>
                                        {moment(transaksi.date).format('DD MMM YYYY HH:mm')}
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={getStatusLabel(transaksi.status)}
                                            color={getStatusColor(transaksi.status) as any}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={(e) => handleMenuOpen(e, transaksi)}
                                            size="small"
                                        >
                                            <RiMoreLine className="w-4 h-4" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ListPageTemplate>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleView}>
                    <RiEyeLine className="w-4 h-4 mr-2" />
                    Lihat Detail
                </MenuItem>
                <MenuItem onClick={handleEdit}>
                    <RiEditLine className="w-4 h-4 mr-2" />
                    Edit Status
                </MenuItem>
                <MenuItem onClick={handleDelete} className="text-red-600">
                    <RiDeleteBinLine className="w-4 h-4 mr-2" />
                    Hapus
                </MenuItem>
            </Menu>
        </>
    );
};

// Export with HOC wrapper for global enhancements
export default withListPage(TransaksiOptimized);
