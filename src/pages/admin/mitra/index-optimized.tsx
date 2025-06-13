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
    MenuItem,
    Dialog,
    DialogContent,
    DialogContentText,
    Typography,
    Button
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { RiMoreLine, RiEyeLine, RiEditLine, RiDeleteBinLine } from '@remixicon/react';
import moment from 'moment-timezone';

// Optimized imports
import { withListPage, usePageUtils } from '../../../hoc/withPageEnhancements';
import ListPageTemplate from '../../../components/templates/ListPageTemplate';
import { useListData } from '../../../hooks/usePageData';
import { ROUTES, PAGE_TITLES } from '../../../constants/routes';
import { UppercaseFirstWord } from '../../../helpers/Converter';

interface MitraData {
    id: number;
    name: string;
    email: string;
    phone: string;
    register_at: string;
    type: 'pribadi' | 'perusahaan';
    status: 'pending' | 'approve' | 'reject';
}

/**
 * Optimized Mitra List component using new architecture
 */
const MitraOptimized: React.FC = () => {
    const { showSuccess, showError, goToDetail, goToEdit, goToCreate } = usePageUtils();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedMitra, setSelectedMitra] = useState<MitraData | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    // Mock data - replace with actual API call
    const mockMitraData: MitraData[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '081234567890',
            register_at: '2023-08-17 19:08:45',
            type: 'pribadi',
            status: 'approve'
        },
        {
            id: 2,
            name: 'PT. Example Corp',
            email: 'info@example.com',
            phone: '021-12345678',
            register_at: '2023-08-18 10:30:00',
            type: 'perusahaan',
            status: 'pending'
        },
        {
            id: 3,
            name: 'Jane Smith',
            email: 'jane.smith@email.com',
            phone: '081987654321',
            register_at: '2023-08-19 14:15:30',
            type: 'pribadi',
            status: 'reject'
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
            setOpenDialog(true);
        }
        handleMenuClose();
    };

    const confirmDelete = async () => {
        if (selectedMitra) {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                showSuccess(`Mitra ${selectedMitra.name} berhasil dihapus`);
                refetch();
                setOpenDialog(false);
            } catch (error) {
                showError('Gagal menghapus mitra');
            }
        }
    };

    const handleAdd = () => {
        goToCreate('mitra');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approve': return 'success';
            case 'pending': return 'warning';
            case 'reject': return 'error';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'approve': return 'Approve';
            case 'pending': return 'Pending';
            case 'reject': return 'Reject';
            default: return 'Tidak Diketahui';
        }
    };

    const getTypeLabel = (type: string) => {
        return UppercaseFirstWord(type);
    };

    return (
        <>
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
                                <TableCell>No. HP</TableCell>
                                <TableCell>Tgl. Daftar</TableCell>
                                <TableCell>Jenis Mitra</TableCell>
                                <TableCell>Status</TableCell>
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
                                        {moment(mitra.register_at).format('DD MMMM YYYY HH:mm')}
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={getTypeLabel(mitra.type)}
                                            variant="outlined"
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={getStatusLabel(mitra.status)}
                                            color={getStatusColor(mitra.status) as any}
                                            size="small"
                                        />
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
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete} className="text-red-600">
                    <RiDeleteBinLine className="w-4 h-4 mr-2" />
                    Hapus
                </MenuItem>
            </Menu>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogContent className="text-center p-8">
                    <img
                        src="/images/danger.svg"
                        alt="Warning"
                        className="mx-auto mb-4"
                        loading="lazy"
                    />
                    <Typography variant="h5" className="font-semibold mb-4">
                        Apakah kamu yakin akan menghapus data ini?
                    </Typography>
                    <Typography color="textSecondary" className="mb-6">
                        Setelah data dihapus Anda tidak bisa melihat data tersebut
                    </Typography>
                    <div className="flex gap-4 justify-center">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={confirmDelete}
                        >
                            Hapus
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setOpenDialog(false)}
                        >
                            Batal
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

// Export with HOC wrapper for global enhancements
export default withListPage(MitraOptimized);
