import { Close } from "@mui/icons-material";
import { Box, Dialog, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { RiArrowLeftLine, RiArrowRightLine, RiListCheck, RiSearchLine } from "@remixicon/react";
import { MRT_ColumnDef, MRT_GlobalFilterTextField, MRT_ShowHideColumnsButton, MRT_TableContainer, MRT_TableHeadCellFilterContainer, MRT_TablePagination, useMaterialReactTable } from "material-react-table";
import { Iconly } from "react-iconly";

interface TableProps {
    data: any;
    columns: MRT_ColumnDef<any>[];
    setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
    openFilter: boolean;
    filterExclude: string[];
    state?: any
}

function Table(props: TableProps) {
    const { data, setOpenFilter, openFilter, columns, filterExclude, state } = props;

    const table = useMaterialReactTable({
        columns,
        data,
        initialState: {
            density: "compact",
            pagination: {
                pageIndex: 0,
                pageSize: 5
            },
            showGlobalFilter: true
        },
        muiTablePaperProps: {
            sx: {
                borderRadius: 0,
                padding: 1,
                boxShadow: 0,
                border: 0
            },
        },
        muiTableBodyCellProps: {
            sx: {
                border: 0,
                paddingTop: '16px',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingBottom: '16px',
            }
        },
        muiTableHeadCellProps: {
            sx: {
                border: 0,
                bgcolor: '#F8FAFC',
                paddingTop: '16px',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingBottom: '16px',
            }
        },
        paginationDisplayMode: 'pages',
        muiPaginationProps: {
            showFirstButton: false,
            showLastButton: false,
            shape: 'rounded',
            variant: 'text',
            sx: {
                '.MuiPaginationItem-root': {
                    bgcolor: '#F1F5F9',
                    borderRadius: '4px',
                },
                '.MuiButtonBase-root.MuiPaginationItem-root.Mui-selected': {
                    bgcolor: '#008FD7'
                },
                '.Mui-selected': {
                    color: '#fff',
                    bgcolor: '#008FD7'
                },
                '.MuiPaginationItem-text': {
                    padding: '6px 17px',
                },
                '.MuiPaginationItem-previousNext': {
                    bgcolor: 'transparent',
                    color: '#64748B'
                }
            }
        },
        icons: {
            ChevronLeftIcon: (props: any) => <RiArrowLeftLine {...props} />,
            ChevronRightIcon: (props: any) => <RiArrowRightLine {...props} />,
            SearchIcon: (props: any) => <RiSearchLine color="#64748B" {...props} />,
            ViewColumnIcon: (props: any) => <RiListCheck {...props} />,
        },
        muiSearchTextFieldProps: {
            InputProps: {
                sx: {
                    width: '250px',
                    marginRight: '8px',
                    outlineColor: '#F1F5F9'
                },
            },
            placeholder: 'Cari Kata Kunci',
            variant: 'outlined',
        }
    });
    return (
        <>
            <Box
                sx={{
                    marginTop: '24px',
                    bgcolor: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    '.MuiPagination-ul': {
                        display: 'none'
                    },
                    '.MuiFormLabel-root': {
                        display: 'none',
                    }
                }}
            >
                <Grid2 container>
                    <Typography className="self-center mr-4">Show</Typography>
                    <MRT_TablePagination table={table}></MRT_TablePagination>
                    <Typography className="self-center">data</Typography>
                </Grid2>
                <Grid2 container>
                    <MRT_GlobalFilterTextField table={table} className='mr-1' sx={{
                        '.MuiInputBase-root': {
                            // outlineColor: '#F1595C'
                        }
                    }} />
                    <Grid2 container className='rounded-lg outline outline-2 outline-general-100 mr-3'>
                        <IconButton className='rounded-lg' onClick={() => setOpenFilter(true)}>
                            <Iconly name='Filter' />
                        </IconButton>
                    </Grid2>
                    <Grid2 container className='rounded-lg outline outline-2 outline-general-100'>
                        <MRT_ShowHideColumnsButton table={table} className='rounded-lg' />
                    </Grid2>
                </Grid2>
            </Box>
            <MRT_TableContainer table={table} sx={{ marginTop: '24px' }} />
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <MRT_TablePagination table={table} showRowsPerPage={false} />
                </Box>
            </Box>
            <Dialog open={openFilter} maxWidth={'sm'}>
                <DialogTitle>
                    Filter
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpenFilter(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
                <Box sx={{
                    width: '500px',
                }}>
                    <Stack p="25px" gap="20px">
                        {table.getLeafHeaders().map((header, index) => {
                            if (!filterExclude.includes(header.id)) {
                                return <Box key={header.id}>
                                    <Typography className='text-lg mb-2'>
                                        {header.column.columnDef.header}
                                    </Typography>
                                    <MRT_TableHeadCellFilterContainer
                                        header={header}
                                        table={table}
                                        in

                                    />
                                </Box>
                            }
                        })}
                    </Stack>
                </Box>
            </Dialog>
        </>
    )
}
export default Table