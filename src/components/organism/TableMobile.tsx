import { Close } from "@mui/icons-material";
import { Box, Dialog, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { RiArrowLeftLine, RiArrowRightLine, RiListCheck, RiSearchLine } from "@remixicon/react";
import { MRT_ColumnDef, MRT_GlobalFilterTextField, MRT_ShowHideColumnsButton, MRT_TableContainer, MRT_TableHeadCellFilterContainer, MRT_TablePagination, useMaterialReactTable } from "material-react-table";
import { Iconly } from "react-iconly";

interface TableMobileProps {
    data: any;
    columns: MRT_ColumnDef<any>[];
    setOpenFilterMobile: React.Dispatch<React.SetStateAction<boolean>>;
    openFilterMobile: boolean;
    filterExclude: string[];
    state?: any
}

function TableMobile(props: TableMobileProps) {
    const { data, columns, setOpenFilterMobile, openFilterMobile, filterExclude, state } = props;
    const tableMobile = useMaterialReactTable({
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
        // enableColumnFilters: false,
        // enableHiding: false,
        enableDensityToggle: false,
        enableFullScreenToggle: false,

        paginationDisplayMode: 'pages',
        muiPaginationProps: {
            siblingCount: 0,
            boundaryCount: 1,
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
                    padding: '6px 10px',
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
                    outlineColor: '#F1F5F9',
                    marginTop: '10px'
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
                <Grid2 container xs={12}>
                    <Grid2 container xs={7}>
                        <Typography className="self-center">Show</Typography>
                        <MRT_TablePagination table={tableMobile}></MRT_TablePagination>
                        <Typography className="self-center">data</Typography>
                    </Grid2>
                    <Grid2 container xs={5} justifyContent="space-around">
                        <Grid2 container className='rounded-lg outline outline-2 w-12 h-12 outline-general-100'>
                            <IconButton className='rounded-lg w-12 h-12' onClick={() => setOpenFilterMobile(true)}>
                                <Iconly name='Filter' />
                            </IconButton>
                        </Grid2>
                        <Grid2 container className='rounded-lg outline outline-2 w-12 h-12 outline-general-100' justifyContent={'center'} alignItems={'center'}>
                            <MRT_ShowHideColumnsButton table={tableMobile} className='rounded-lg w-12 h-12' />
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Box>
            <MRT_GlobalFilterTextField table={tableMobile} />

            <MRT_TableContainer table={tableMobile} sx={{
                marginTop: '24px',
                ".MuiTableCell-root": {
                    whiteSpace: 'normal'
                }
            }} />
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <MRT_TablePagination table={tableMobile} showRowsPerPage={false} />
                </Box>
            </Box>
            <Dialog open={openFilterMobile} maxWidth={'sm'}>
                <DialogTitle>
                    Filter
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpenFilterMobile(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
                <Box>
                    <Stack p="25px" gap="20px">
                        {tableMobile.getLeafHeaders().map((header, index) => {
                            if (!filterExclude.includes(header.id)) {
                                return <Box key={header.id}>
                                    <Typography className='text-lg mb-2'>
                                        {header.column.columnDef.header}
                                    </Typography>
                                    <MRT_TableHeadCellFilterContainer
                                        header={header}
                                        table={tableMobile}
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
export default TableMobile