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
import { RiMoreLine, RiEyeLine, RiCheckLine, RiCloseLine } from '@remixicon/react';
import moment from 'moment';

// Optimized imports
import { withListPage, usePageUtils } from '../../../hoc/withPageEnhancements';
import ListPageTemplate from '../../../components/templates/ListPageTemplate';
import { useListData } from '../../../hooks/usePageData';
import { ROUTES, PAGE_TITLES } from '../../../constants/routes';
import Currency from '../../../components/atoms/Currency';

interface DepositData {
    id: number;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    date: string;
    user_name: string;
    user_email: string;
    bank_name: string;
    account_number: string;
    proof_image?: string;
}

/**
 * Optimized Deposit List component using new architecture
 */
const DepositOptimized: React.FC = () => {
    const { showSuccess, showError, goToDetail } = usePageUtils();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedDeposit, setSelectedDeposit] = useState<DepositData | null>(null);

    // Mock data - replace with actual API call
    const mockDepositData: DepositData[] = [
        {
            id: 1,
            amount: 500000,
            status: 'pending',
            date: '2023-08-17 09:30:00',
            user_name: 'John Doe',
            user_email: 'johndoe@example.com',
            bank_name: 'Bank BCA',
            account_number: '1234567890',
            proof_image: '/images/proof1.jpg'
        },
        {
            id: 2,
            amount: 1000000,
            status: 'approved',
            date: '2023-08-16 14:15:00',
            user_name: 'Jane Smith',
            user_email: 'jane.smith@email.com',
            bank_name: 'Bank Mandiri',
            account_number: '0987654321',
            proof_image: '/images/proof2.jpg'
        },
        {
            id: 3,
            amount: 250000,
            status: 'rejected',
            date: '2023-08-15 11:45:00',
            user_name: 'Bob Johnson',
            user_email: 'bob.johnson@email.com',
            bank_name: 'Bank BNI',
            account_number: '5555666677',
            proof_image: '/images/proof3.jpg'
        }
    ];

    // Use the global list data hook
    const {
        data: depositList,
        loading,
        error,
        handleSearch,
        refetch
    } = useListData<DepositData>(
        async (params) => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            let filteredData = mockDepositData;
            
            // Apply search filter
            if (params?.search) {
                filteredData = filteredData.filter(deposit => 
                    deposit.user_name.toLowerCase().includes(params.search.toLowerCase()) ||
                    deposit.user_email.toLowerCase().includes(params.search.toLowerCase()) ||
                    deposit.bank_name.toLowerCase().includes(params.search.toLowerCase())
                );
            }
            
            return filteredData;
        },
        {
            initialData: [],
            fetchOnMount: true
        }
    );

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, deposit: DepositData) => {
        setAnchorEl(event.currentTarget);
        setSelectedDeposit(deposit);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedDeposit(null);
    };

    const handleView = () => {
        if (selectedDeposit) {
            goToDetail('deposit', selectedDeposit.id);
        }
        handleMenuClose();
    };

    const handleApprove = async () => {
        if (selectedDeposit) {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                showSuccess(`Deposit ${selectedDeposit.user_name} berhasil disetujui`);
                refetch();
            } catch (error) {
                showError('Gagal menyetujui deposit');
            }
        }
        handleMenuClose();
    };

    const handleReject = async () => {
        if (selectedDeposit) {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                showSuccess(`Deposit ${selectedDeposit.user_name} berhasil ditolak`);
                refetch();
            } catch (error) {
                showError('Gagal menolak deposit');
            }
        }
        handleMenuClose();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'success';
            case 'pending': return 'warning';
            case 'rejected': return 'error';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'approved': return 'Disetujui';
            case 'pending': return 'Menunggu';
            case 'rejected': return 'Ditolak';
            default: return 'Tidak Diketahui';
        }
    };

    return (
        <>
            <ListPageTemplate
                title={PAGE_TITLES.DEPOSIT}
                data={depositList}
                loading={loading}
                error={error}
                onSearch={handleSearch}
                addable={false} // Deposit tidak bisa ditambah manual
                searchPlaceholder="Cari deposit..."
                emptyMessage="Belum ada pengajuan deposit"
            >
                <TableContainer component={Paper} className="rounded-lg">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Pengguna</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Jumlah</TableCell>
                                <TableCell>Bank</TableCell>
                                <TableCell>Tanggal</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {depositList?.map((deposit) => (
                                <TableRow key={deposit.id} hover>
                                    <TableCell className="font-semibold">
                                        #{deposit.id}
                                    </TableCell>
                                    <TableCell>{deposit.user_name}</TableCell>
                                    <TableCell>{deposit.user_email}</TableCell>
                                    <TableCell className="font-semibold">
                                        <Currency value={deposit.amount} />
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-semibold">{deposit.bank_name}</div>
                                            <div className="text-sm text-gray-500">
                                                {deposit.account_number}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {moment(deposit.date).format('DD MMM YYYY HH:mm')}
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={getStatusLabel(deposit.status)}
                                            color={getStatusColor(deposit.status) as any}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={(e) => handleMenuOpen(e, deposit)}
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
                {selectedDeposit?.status === 'pending' && (
                    <>
                        <MenuItem onClick={handleApprove} className="text-green-600">
                            <RiCheckLine className="w-4 h-4 mr-2" />
                            Setujui
                        </MenuItem>
                        <MenuItem onClick={handleReject} className="text-red-600">
                            <RiCloseLine className="w-4 h-4 mr-2" />
                            Tolak
                        </MenuItem>
                    </>
                )}
            </Menu>
        </>
    );
};

// Export with HOC wrapper for global enhancements
export default withListPage(DepositOptimized);
