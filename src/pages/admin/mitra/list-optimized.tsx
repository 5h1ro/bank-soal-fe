import React from 'react';
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

// Optimized imports
import { withListPage, usePageUtils } from '../../../hoc/withPageEnhancements';
import ListPageTemplate from '../../../components/templates/ListPageTemplate';
import { useListData } from '../../../hooks/usePageData';
import { ROUTES, PAGE_TITLES } from '../../../constants/routes';

interface MitraData {
    id: number;
    name: string;
    email: string;
    phone: string;
    register_at: string;
    type: 'pribadi' | 'perusahaan';
    status: 'pending' | 'active' | 'inactive';
}

/**
 * Optimized Mitra List component using new architecture
 */
const MitraListOptimized: React.FC = () => {
    const { showSuccess, showError, goToDetail, goToEdit, goToCreate } = usePageUtils();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedMitra, setSelectedMitra] = React.useState<MitraData | null>(null);

    // Mock data - replace with actual API call
    const mockMitraData: MitraData[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '081234567890',
            register_at: '2023-08-17 19:08:45',
            type: 'pribadi',
            status: 'active'
        },
        {
            id: 2,
            name: 'PT. Example Corp',
            email: 'info@example.com',
            phone: '021-12345678',
            register_at: '2023-08-18 10:30:00',
            type: 'perusahaan',
            status: 'pending'
        }
    ];

    // Use the global list data hook
    const {
        data: mitraList,
        loading,
        error,
        handleSearch,
        refetch
    } = useListData<MitraData>(
        async (params) => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            let filteredData = mockMitraData;
            
            // Apply search filter
            if (params?.search) {
                filteredData = filteredData.filter(mitra => 
                    mitra.name.toLowerCase().includes(params.search.toLowerCase()) ||
                    mitra.email.toLowerCase().includes(params.search.toLowerCase())
                );
            }
            
            return filteredData;
        },
        {
            initialData: [],
            fetchOnMount: true
        }
    );

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, mitra: MitraData) => {
        setAnchorEl(event.currentTarget);
        setSelectedMitra(mitra);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedMitra(null);
    };

    const handleView = () => {
        if (selectedMitra) {
            goToDetail('mitra', selectedMitra.id);
        }
        handleMenuClose();
    };

    const handleEdit = () => {
        if (selectedMitra) {
            goToEdit('mitra', selectedMitra.id);
        }
        handleMenuClose();
    };

    const handleDelete = async () => {
        if (selectedMitra) {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                showSuccess(`Mitra ${selectedMitra.name} berhasil dihapus`);
                refetch();
            } catch (error) {
                showError('Gagal menghapus mitra');
            }
        }
        handleMenuClose();
    };

    const handleAdd = () => {
        goToCreate('mitra');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'success';
            case 'pending': return 'warning';
            case 'inactive': return 'error';
            default: return 'default';
        }
    };

    const getTypeLabel = (type: string) => {
        return type === 'pribadi' ? 'Pribadi' : 'Perusahaan';
    };

    return (
        <ListPageTemplate
            title={PAGE_TITLES.MITRA}
            data={mitraList}
            loading={loading}
            error={error}
            onSearch={handleSearch}
            onAdd={handleAdd}
            addButtonText="Tambah Mitra"
            searchPlaceholder="Cari mitra..."
            emptyMessage="Belum ada mitra terdaftar"
        >
            <TableContainer component={Paper} className="rounded-lg">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nama</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telepon</TableCell>
                            <TableCell>Tipe</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Tanggal Daftar</TableCell>
                            <TableCell align="center">Aksi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mitraList?.map((mitra) => (
                            <TableRow key={mitra.id} hover>
                                <TableCell className="font-semibold">
                                    {mitra.name}
                                </TableCell>
                                <TableCell>{mitra.email}</TableCell>
                                <TableCell>{mitra.phone}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={getTypeLabel(mitra.type)}
                                        variant="outlined"
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        label={mitra.status}
                                        color={getStatusColor(mitra.status) as any}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {new Date(mitra.register_at).toLocaleDateString('id-ID')}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        onClick={(e) => handleMenuOpen(e, mitra)}
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
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete} className="text-red-600">
                    <RiDeleteBinLine className="w-4 h-4 mr-2" />
                    Hapus
                </MenuItem>
            </Menu>
        </ListPageTemplate>
    );
};

// Export with HOC wrapper for global enhancements
export default withListPage(MitraListOptimized);
