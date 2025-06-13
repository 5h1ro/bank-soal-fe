import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Typography, Button, TextField, InputAdornment } from '@mui/material';
import { RiSearchLine, RiAddLine, RiFilterLine } from '@remixicon/react';
import PageHeader from '../molecules/PageHeader';
import { ListPageProps } from '../../types/test.types';

interface ListPageTemplateProps extends ListPageProps {
    children: React.ReactNode;
    loading?: boolean;
    error?: string | null;
    searchable?: boolean;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    filterable?: boolean;
    onFilterToggle?: () => void;
    addable?: boolean;
    addButtonText?: string;
    onAdd?: () => void;
    headerActions?: React.ReactNode;
    emptyMessage?: string;
    loadingComponent?: React.ReactNode;
}

/**
 * Reusable template for list pages
 * Provides consistent layout, search, filter, and add functionality
 */
const ListPageTemplate: React.FC<ListPageTemplateProps> = ({
    title = 'List',
    backPath,
    onBack,
    children,
    loading = false,
    error = null,
    data = [],
    searchable = true,
    searchPlaceholder = 'Cari...',
    onSearch,
    filterable = true,
    onFilterToggle,
    addable = true,
    addButtonText = 'Tambah',
    onAdd,
    headerActions,
    emptyMessage = 'Tidak ada data',
    loadingComponent
}) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (onSearch) {
            onSearch(query);
        }
    };

    // Default loading component
    const defaultLoadingComponent = (
        <Grid2 className="bg-base-white rounded-lg p-6" xs={12}>
            <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex space-x-4">
                        <div className="h-12 bg-gray-200 rounded w-12"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </Grid2>
    );

    // Actions bar
    const actionsBar = (searchable || filterable || addable || headerActions) && (
        <Grid2 container spacing={2} marginBottom={2} alignItems="center">
            {searchable && (
                <Grid2 xs={12} md={6}>
                    <TextField
                        fullWidth
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <RiSearchLine className="w-5 h-5 text-gray-400" />
                                </InputAdornment>
                            ),
                        }}
                        size="small"
                    />
                </Grid2>
            )}
            
            <Grid2 xs={12} md={6} container justifyContent="flex-end" spacing={1}>
                {filterable && (
                    <Button
                        variant="outlined"
                        startIcon={<RiFilterLine className="w-4 h-4" />}
                        onClick={onFilterToggle}
                        size="small"
                    >
                        Filter
                    </Button>
                )}
                
                {addable && (
                    <Button
                        variant="contained"
                        startIcon={<RiAddLine className="w-4 h-4" />}
                        onClick={onAdd}
                        size="small"
                    >
                        {addButtonText}
                    </Button>
                )}
                
                {headerActions}
            </Grid2>
        </Grid2>
    );

    return (
        <>
            <PageHeader 
                title={title} 
                backPath={backPath}
                onBack={onBack}
            />
            
            <Grid2 container marginTop={3}>
                <Grid2 xs={12}>
                    {actionsBar}
                    
                    {loading ? (
                        loadingComponent || defaultLoadingComponent
                    ) : error ? (
                        <Grid2 className="bg-base-white rounded-lg p-6" xs={12}>
                            <div className="text-center py-8">
                                <Typography color="error" className="mb-4">
                                    {error}
                                </Typography>
                                <Button 
                                    onClick={() => window.location.reload()}
                                    variant="contained"
                                >
                                    Muat Ulang
                                </Button>
                            </div>
                        </Grid2>
                    ) : data.length === 0 ? (
                        <Grid2 className="bg-base-white rounded-lg p-6" xs={12}>
                            <div className="text-center py-8">
                                <Typography className="text-gray-500 mb-4">
                                    {emptyMessage}
                                </Typography>
                                {addable && (
                                    <Button 
                                        variant="contained"
                                        startIcon={<RiAddLine className="w-4 h-4" />}
                                        onClick={onAdd}
                                    >
                                        {addButtonText}
                                    </Button>
                                )}
                            </div>
                        </Grid2>
                    ) : (
                        children
                    )}
                </Grid2>
            </Grid2>
        </>
    );
};

export default ListPageTemplate;
