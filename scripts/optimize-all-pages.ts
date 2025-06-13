/**
 * Script to generate optimized versions of all admin pages
 * This script creates optimized versions using the global optimization system
 */

interface PageConfig {
    originalPath: string;
    optimizedPath: string;
    type: 'list' | 'detail' | 'form';
    title: string;
    routeKey: string;
    dataInterface?: string;
    mockData?: any[];
}

const pageConfigurations: PageConfig[] = [
    // List Pages
    {
        originalPath: 'src/pages/admin/transaksi/index.tsx',
        optimizedPath: 'src/pages/admin/transaksi/index-optimized.tsx',
        type: 'list',
        title: 'TRANSAKSI',
        routeKey: 'TRANSAKSI',
        dataInterface: 'TransaksiData',
        mockData: [
            { id: 1, amount: 100000, status: 'completed', date: '2023-08-17', description: 'Payment for test' },
            { id: 2, amount: 250000, status: 'pending', date: '2023-08-18', description: 'Assessment fee' }
        ]
    },
    {
        originalPath: 'src/pages/admin/transaksi_user/index.tsx',
        optimizedPath: 'src/pages/admin/transaksi_user/index-optimized.tsx',
        type: 'list',
        title: 'TRANSAKSI_USER',
        routeKey: 'TRANSAKSI_USER',
        dataInterface: 'TransaksiUserData'
    },
    {
        originalPath: 'src/pages/admin/riwayat/index.tsx',
        optimizedPath: 'src/pages/admin/riwayat/index-optimized.tsx',
        type: 'list',
        title: 'RIWAYAT',
        routeKey: 'RIWAYAT',
        dataInterface: 'RiwayatData'
    },
    {
        originalPath: 'src/pages/admin/riwayat_tes/index.tsx',
        optimizedPath: 'src/pages/admin/riwayat_tes/index-optimized.tsx',
        type: 'list',
        title: 'RIWAYAT_TES',
        routeKey: 'RIWAYAT_TES',
        dataInterface: 'RiwayatTesData'
    },
    {
        originalPath: 'src/pages/admin/riwayat_order/index.tsx',
        optimizedPath: 'src/pages/admin/riwayat_order/index-optimized.tsx',
        type: 'list',
        title: 'RIWAYAT_ORDER',
        routeKey: 'RIWAYAT_ORDER',
        dataInterface: 'RiwayatOrderData'
    },
    {
        originalPath: 'src/pages/admin/deposit/index.tsx',
        optimizedPath: 'src/pages/admin/deposit/index-optimized.tsx',
        type: 'list',
        title: 'DEPOSIT',
        routeKey: 'DEPOSIT',
        dataInterface: 'DepositData'
    },
    {
        originalPath: 'src/pages/admin/mutasi/index.tsx',
        optimizedPath: 'src/pages/admin/mutasi/index-optimized.tsx',
        type: 'list',
        title: 'MUTASI',
        routeKey: 'MUTASI',
        dataInterface: 'MutasiData'
    },
    {
        originalPath: 'src/pages/admin/referral/index.tsx',
        optimizedPath: 'src/pages/admin/referral/index-optimized.tsx',
        type: 'list',
        title: 'REFERRAL',
        routeKey: 'REFERRAL',
        dataInterface: 'ReferralData'
    },
    {
        originalPath: 'src/pages/admin/manajemen_tes/list_tes/index.tsx',
        optimizedPath: 'src/pages/admin/manajemen_tes/list_tes/index-optimized.tsx',
        type: 'list',
        title: 'LIST_TES',
        routeKey: 'LIST_TES',
        dataInterface: 'ListTesData'
    },
    {
        originalPath: 'src/pages/admin/manajemen_tes/alat_tes/index.tsx',
        optimizedPath: 'src/pages/admin/manajemen_tes/alat_tes/index-optimized.tsx',
        type: 'list',
        title: 'ALAT_TES',
        routeKey: 'ALAT_TES',
        dataInterface: 'AlatTesData'
    },

    // Detail Pages
    {
        originalPath: 'src/pages/admin/transaksi/detail.tsx',
        optimizedPath: 'src/pages/admin/transaksi/detail-optimized.tsx',
        type: 'detail',
        title: 'TRANSAKSI_DETAIL',
        routeKey: 'TRANSAKSI',
        dataInterface: 'TransaksiData'
    },
    {
        originalPath: 'src/pages/admin/mitra/detail.tsx',
        optimizedPath: 'src/pages/admin/mitra/detail-optimized.tsx',
        type: 'detail',
        title: 'MITRA_DETAIL',
        routeKey: 'MITRA',
        dataInterface: 'MitraData'
    },
    {
        originalPath: 'src/pages/admin/riwayat/detail.tsx',
        optimizedPath: 'src/pages/admin/riwayat/detail-optimized.tsx',
        type: 'detail',
        title: 'RIWAYAT_DETAIL',
        routeKey: 'RIWAYAT',
        dataInterface: 'RiwayatData'
    },
    {
        originalPath: 'src/pages/admin/deposit/detail.tsx',
        optimizedPath: 'src/pages/admin/deposit/detail-optimized.tsx',
        type: 'detail',
        title: 'DEPOSIT_DETAIL',
        routeKey: 'DEPOSIT',
        dataInterface: 'DepositData'
    },

    // Form Pages
    {
        originalPath: 'src/pages/admin/mitra/update.tsx',
        optimizedPath: 'src/pages/admin/mitra/update-optimized.tsx',
        type: 'form',
        title: 'MITRA_UPDATE',
        routeKey: 'MITRA',
        dataInterface: 'MitraData'
    },
    {
        originalPath: 'src/pages/admin/manajemen_tes/list_tes/create.tsx',
        optimizedPath: 'src/pages/admin/manajemen_tes/list_tes/create-optimized.tsx',
        type: 'form',
        title: 'LIST_TES_CREATE',
        routeKey: 'LIST_TES',
        dataInterface: 'ListTesData'
    },
    {
        originalPath: 'src/pages/admin/manajemen_tes/alat_tes/create.tsx',
        optimizedPath: 'src/pages/admin/manajemen_tes/alat_tes/create-optimized.tsx',
        type: 'form',
        title: 'ALAT_TES_CREATE',
        routeKey: 'ALAT_TES',
        dataInterface: 'AlatTesData'
    }
];

/**
 * Generate optimized list page template
 */
function generateListPageTemplate(config: PageConfig): string {
    const componentName = config.optimizedPath.split('/').pop()?.replace('.tsx', '').replace('-optimized', '') + 'Optimized';
    
    return `import React, { useState } from 'react';
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

interface ${config.dataInterface} {
    id: number;
    // Add specific fields based on your data structure
    [key: string]: any;
}

/**
 * Optimized ${config.title} List component using new architecture
 */
const ${componentName}: React.FC = () => {
    const { showSuccess, showError, goToDetail, goToEdit, goToCreate } = usePageUtils();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedItem, setSelectedItem] = useState<${config.dataInterface} | null>(null);

    // Mock data - replace with actual API call
    const mockData: ${config.dataInterface}[] = ${JSON.stringify(config.mockData || [{ id: 1, name: 'Sample Data' }], null, 8)};

    // Use the global list data hook
    const {
        data: itemList,
        loading,
        error,
        handleSearch,
        refetch
    } = useListData<${config.dataInterface}>(
        async (params) => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            let filteredData = mockData;
            
            // Apply search filter
            if (params?.search) {
                filteredData = filteredData.filter(item => 
                    JSON.stringify(item).toLowerCase().includes(params.search.toLowerCase())
                );
            }
            
            return filteredData;
        },
        {
            initialData: [],
            fetchOnMount: true
        }
    );

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, item: ${config.dataInterface}) => {
        setAnchorEl(event.currentTarget);
        setSelectedItem(item);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedItem(null);
    };

    const handleView = () => {
        if (selectedItem) {
            goToDetail('${config.routeKey.toLowerCase()}', selectedItem.id);
        }
        handleMenuClose();
    };

    const handleEdit = () => {
        if (selectedItem) {
            goToEdit('${config.routeKey.toLowerCase()}', selectedItem.id);
        }
        handleMenuClose();
    };

    const handleDelete = async () => {
        if (selectedItem) {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                showSuccess('Data berhasil dihapus');
                refetch();
            } catch (error) {
                showError('Gagal menghapus data');
            }
        }
        handleMenuClose();
    };

    const handleAdd = () => {
        goToCreate('${config.routeKey.toLowerCase()}');
    };

    return (
        <>
            <ListPageTemplate
                title={PAGE_TITLES.${config.title}}
                data={itemList}
                loading={loading}
                error={error}
                onSearch={handleSearch}
                onAdd={handleAdd}
                addButtonText="Tambah Data"
                searchPlaceholder="Cari data..."
                emptyMessage="Belum ada data"
            >
                <TableContainer component={Paper} className="rounded-lg">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {itemList?.map((item) => (
                                <TableRow key={item.id} hover>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{JSON.stringify(item)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={(e) => handleMenuOpen(e, item)}
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
        </>
    );
};

// Export with HOC wrapper for global enhancements
export default withListPage(${componentName});`;
}

/**
 * Generate optimized detail page template
 */
function generateDetailPageTemplate(config: PageConfig): string {
    const componentName = config.optimizedPath.split('/').pop()?.replace('.tsx', '').replace('-optimized', '') + 'Optimized';
    
    return `import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Chip } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

// Optimized imports
import { withDetailPage, usePageUtils } from '../../../hoc/withPageEnhancements';
import DetailPageTemplate from '../../../components/templates/DetailPageTemplate';
import { usePageData } from '../../../hooks/usePageData';
import { ROUTES, PAGE_TITLES } from '../../../constants/routes';

interface ${config.dataInterface} {
    id: string;
    // Add specific fields based on your data structure
    [key: string]: any;
}

const ${componentName}: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { showSuccess, showError } = usePageUtils();

    const { data, loading, error } = usePageData<${config.dataInterface}>(
        async () => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            return {
                id: id || '1',
                name: 'Sample Data',
                status: 'active',
                // Add more mock data fields
            };
        },
        { dependencies: [id] }
    );

    return (
        <DetailPageTemplate
            title={PAGE_TITLES.${config.title}}
            backPath={ROUTES.${config.routeKey}}
            data={data}
            loading={loading}
            error={error}
        >
            {data && (
                <Grid2 className="bg-base-white rounded-lg p-6" xs={12}>
                    <Typography variant="h6" className="mb-4">
                        Detail Information
                    </Typography>
                    <div className="space-y-4">
                        <div>
                            <Typography variant="body2" color="textSecondary">
                                ID
                            </Typography>
                            <Typography variant="body1" className="font-semibold">
                                {data.id}
                            </Typography>
                        </div>
                        {/* Add more fields as needed */}
                    </div>
                </Grid2>
            )}
        </DetailPageTemplate>
    );
};

export default withDetailPage(${componentName});`;
}

/**
 * Generate optimized form page template
 */
function generateFormPageTemplate(config: PageConfig): string {
    const componentName = config.optimizedPath.split('/').pop()?.replace('.tsx', '').replace('-optimized', '') + 'Optimized';
    
    return `import React from 'react';
import { TextField, Button, Grid } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

// Optimized imports
import { withFormPage, usePageUtils } from '../../../hoc/withPageEnhancements';
import DetailPageTemplate from '../../../components/templates/DetailPageTemplate';
import { useFormData } from '../../../hooks/usePageData';
import { ROUTES, PAGE_TITLES } from '../../../constants/routes';

interface ${config.dataInterface} {
    id?: string;
    name: string;
    // Add specific fields based on your data structure
    [key: string]: any;
}

const ${componentName}: React.FC = () => {
    const { goBack, showSuccess } = usePageUtils();

    const { formData, updateField, handleSubmit, submitting, errors } = useFormData<${config.dataInterface}>(
        async (data) => {
            // Submit API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { success: true };
        },
        { name: '' } // Initial form data
    );

    const onSubmit = async () => {
        try {
            await handleSubmit();
            showSuccess('Data berhasil disimpan');
            goBack();
        } catch (error) {
            // Error handled by hook
        }
    };

    return (
        <DetailPageTemplate
            title={PAGE_TITLES.${config.title}}
            backPath={ROUTES.${config.routeKey}}
            data={{}} // Always show form
        >
            <Grid2 className="bg-base-white rounded-lg p-6" xs={12}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            value={formData.name || ''}
                            onChange={(e) => updateField('name', e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Grid>
                    {/* Add more form fields as needed */}
                    <Grid item xs={12}>
                        <div className="flex gap-4">
                            <Button 
                                variant="contained"
                                onClick={onSubmit} 
                                disabled={submitting}
                            >
                                {submitting ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                            <Button 
                                variant="outlined"
                                onClick={goBack}
                            >
                                Batal
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid2>
        </DetailPageTemplate>
    );
};

export default withFormPage(${componentName});`;
}

export { pageConfigurations, generateListPageTemplate, generateDetailPageTemplate, generateFormPageTemplate };
