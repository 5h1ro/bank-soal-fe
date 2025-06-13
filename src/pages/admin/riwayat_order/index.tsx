import { Alert, Box, Button, Chip, Dialog, DialogContent, DialogContentText, Grid, IconButton, Snackbar, Stack, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { RiArrowDownSLine, RiArrowDropDownLine, RiArrowUpSLine, RiDeleteBin7Line, RiDownload2Fill, RiDownloadCloudFill, RiDownloadFill, RiEditCircleLine, RiEyeLine, RiHistoryLine, RiMapPin3Line, RiPlayLine } from "@remixicon/react"
import { MRT_ColumnDef } from "material-react-table"
import moment from "moment-timezone"
import { Dispatch, SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../../../components/Layout"
import Table from "../../../components/organism/Table"
import TableMobile from "../../../components/organism/TableMobile"
import { UppercaseFirstWord } from "../../../helpers/Converter"
import { snackbarType } from "../../../interface/snackbar.interface"
import { ArrowDownwardOutlined, ArrowDropDownOutlined } from "@mui/icons-material"

interface snackbarProps {
    showSnackBar: snackbarType
    setShowSnackbar: Dispatch<React.SetStateAction<snackbarType>>
}

function RiwayatOrder(props: snackbarProps) {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const { showSnackBar, setShowSnackbar } = props;
    const [openFilter, setOpenFilter] = useState<boolean>(false)
    const [openFilterMobile, setOpenFilterMobile] = useState<boolean>(false)
    const filterExclude = ['aksi'];

    const data = [
        {
            id: 'SCI-12345-67890-001',
            date: '2023-08-17 19:08:45',
            jenis: 'Inteligensi Umum',
            status: 'finish',
        },
        {
            id: 'SCI-12345-67890-001',
            date: '2023-08-17 19:08:45',
            jenis: 'Inteligensi Umum',
            status: 'unused',
        },
        {
            id: 'SCI-12345-67890-001',
            date: '2023-08-17 19:08:45',
            jenis: 'Inteligensi Umum',
            status: 'unfinish',
        },
        {
            id: 'SCI-12345-67890-001',
            date: '2023-08-17 19:08:45',
            jenis: 'Inteligensi Umum',
            status: 'cheating',
        },
    ]

    const columns: MRT_ColumnDef<any>[] = [
        {
            header: 'Kode Tes',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                return <Typography className="text-primary-500">{row.original.id}</Typography>
            },
            filterFn: 'equals',
            filterSelectOptions: !data ? [''] : (Array.from(new Set(data.map(data => data.id)))).map(data => data),
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            header: 'Tanggal',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                return <Typography>{moment(row.original.date).format('DD MMMM YYYY H:mm:ss')}</Typography>
            },
            filterFn: 'fuzzy',
            filterSelectOptions: !data ? [''] : (Array.from(new Set(data!.map(data => moment(data.date).format('DD MMMM YYYY'))))).map(data => data),
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            header: 'Jenis Tes',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                return <Typography>{row.original.jenis}</Typography>
            },
            filterFn: 'equals',
            filterSelectOptions: !data ? [''] : (Array.from(new Set(data.map(data => data.jenis)))).map(data => data),
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            header: 'Status',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                let status_data
                switch (row.original.status) {
                    case 'finish':
                        status_data = {
                            status: 'Selesai',
                            style: {
                                bg: 'bg-success-50',
                                text: 'text-success-500'
                            }
                        }
                        break;
                    case 'cheating':
                        status_data = {
                            status: 'Indikasi Kecurangan',
                            style: {
                                bg: 'bg-danger-50',
                                text: 'text-danger-500'
                            }
                        }
                        break;
                    case 'unfinish':
                        status_data = {
                            status: 'Belum Selesai',
                            style: {
                                bg: 'bg-secondary-50',
                                text: 'text-secondary-500'
                            }
                        }
                        break;
                    default:
                        status_data = {
                            status: 'Belum digunakan',
                            style: {
                                bg: 'bg-general-50',
                                text: 'text-general-500'
                            }
                        }
                        break;
                }
                return <Chip label={status_data.status} className={`${status_data.style.bg} ${status_data.style.text} rounded-md`} />
            },
            filterFn: 'equals',
            filterSelectOptions: [
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
            ],
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            accessorKey: "aksi",
            header: 'Aksi',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            size: 50,
            Cell: ({ row }) => {
                return <Grid2 container className="flex gap-2">
                    <Button className="border-solid border-2 text-primary-500 rounded-lg pl-4" aria-label="confirm" onClick={() => window.open(row.original.result, '_blank')}>
                        Mulai Tes <RiPlayLine className="ml-1 h-4 w-4"></RiPlayLine>
                    </Button>
                    <Button onClick={() => navigate('/riwayat-order/SCI-12345-67890-001')} className="border-solid border-2 rounded-full w-10 h-10" sx={{
                        minWidth: "0px"
                    }}>
                        <RiHistoryLine className="h-4 w-4"></RiHistoryLine>
                    </Button>
                </Grid2>
            },
            enableColumnFilter: false,
        },
    ];
    const columnMobile: MRT_ColumnDef<any>[] = [
        {
            header: 'Kode Tes',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                let status_data
                switch (row.original.status) {
                    case 'finish':
                        status_data = {
                            status: 'Selesai',
                            style: {
                                bg: 'bg-success-50',
                                text: 'text-success-500'
                            }
                        }
                        break;
                    case 'cheating':
                        status_data = {
                            status: 'Indikasi Kecurangan',
                            style: {
                                bg: 'bg-danger-50',
                                text: 'text-danger-500'
                            }
                        }
                        break;
                    case 'unfinish':
                        status_data = {
                            status: 'Belum Selesai',
                            style: {
                                bg: 'bg-secondary-50',
                                text: 'text-secondary-500'
                            }
                        }
                        break;
                    default:
                        status_data = {
                            status: 'Belum digunakan',
                            style: {
                                bg: 'bg-general-50',
                                text: 'text-general-500'
                            }
                        }
                        break;
                }
                const [collapse, setCollapse] = useState(true)
                return <div id={row.index.toString()} key={row.index}>
                    <div className="flex justify-between my-2 items-center">
                        <Typography className="text-primary-500">{row.original.id}</Typography>
                        <IconButton className="border-solid border-2 rounded-xl md:hidden" aria-label="confirm" onClick={() => {
                            setCollapse(!collapse);
                        }}>
                            {!collapse ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                        </IconButton>
                    </div>
                    {!collapse ? <div className="mt-4">
                        <div>
                            <div className="font-medium">
                                Tanggal
                            </div>
                            <div className="font-normal mt-2">
                                {moment(row.original.date).format('DD MMMM YYYY H:mm:ss')}
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="font-medium">
                                Jenis Tes
                            </div>
                            <div className="font-normal mt-2">
                                {row.original.jenis}
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="font-medium">
                                Status
                            </div>
                            <div className="font-normal mt-2">
                                <Chip label={status_data.status} className={`${status_data.style.bg} ${status_data.style.text} rounded-md`} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="font-medium">
                                Aksi
                            </div>
                            <div className="font-normal mt-2 flex gap-2">
                                <Grid2 container className="flex gap-2">
                                    <Button className="border-solid border-2 text-primary-500 rounded-lg pl-4" aria-label="confirm" onClick={() => window.open(row.original.result, '_blank')}>
                                        Mulai Tes <RiPlayLine className="ml-1 h-4 w-4"></RiPlayLine>
                                    </Button>
                                    <Button onClick={() => navigate('/riwayat-order/SCI-12345-67890-001')} className="border-solid border-2 rounded-full w-10 h-10" sx={{
                                        minWidth: "0px"
                                    }}>
                                        <RiHistoryLine className="h-4 w-4"></RiHistoryLine>
                                    </Button>
                                </Grid2>
                            </div>
                        </div>
                    </div> : null}

                </div>
            },
            filterFn: 'equals',
            // filterSelectOptions: !dataLog ? [''] : (Array.from(new Set(dataLog.data!.map(data => data.created_at)))).map(data => data),
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
    ];

    const handleCloseSnackbar = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowSnackbar({
            isOpen: false,
            message: showSnackBar.message,
            status: 'success'
        })
    };
    return (
        <Layout>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth={'lg'}
                sx={{
                    '.MuiPaper-root': {
                        borderRadius: '16px',
                    }
                }}
            >
                <DialogContent>
                    <Grid2 className='justify-center align-center text-center pt-8 md:pt-16 w-full md:w-[622px]'>
                        <img
                            src='/images/danger.svg'
                            loading="lazy"
                        />
                        <Typography className='text-[32px] font-semibold'>
                            Apakah kamu yakin akan menghapus data ini?
                        </Typography>
                        <Typography marginTop={'16px'}>
                            Setelah data dihapus Anda tidak bisa melihat data tersebut
                        </Typography>
                    </Grid2>
                    <Grid2 container className='flex gap-2 mt-6 justify-center pb-8 md:pb-16'>
                        <Button className='bg-danger-500 text-base-white hover:bg-danger-500 hover:text-base-white py-4 px-6 rounded-xl' onClick={() => {
                            try {
                                setOpenDialog(false)
                                setShowSnackbar({
                                    isOpen: true,
                                    message: "Berhasil menghapus data",
                                    status: 'success'
                                })
                            } catch (error: any) {
                                if (error.data.message) {
                                    setShowSnackbar({
                                        isOpen: true,
                                        message: error.data.message,
                                        status: 'error'
                                    })
                                } else {
                                    setShowSnackbar({
                                        isOpen: true,
                                        message: 'Server error',
                                        status: 'error'
                                    })
                                }
                            }
                        }}>
                            Hapus
                        </Button>
                        <Button className='bg-base-white text-general-500 hover:bg-base-white hover:text-general-500 py-4 px-6 rounded-xl' onClick={() => setOpenDialog(false)}>
                            Batal
                        </Button>
                    </Grid2>
                </DialogContent>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={showSnackBar.isOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    className={(showSnackBar.status === 'success' ? 'bg-success-500' : 'bg-danger-500') + ' w-[85vw] md:w-[496px]'}
                    variant="filled"
                >
                    {showSnackBar.message}
                </Alert>
            </Snackbar>
            <Typography className="text-4xl font-semibold">
                Riwayat Order
            </Typography>

            <Grid2 container className="hidden md:block" marginTop={4}>
                <Box sx={{
                    "& .MuiBox-root": {
                        boxShadow: "0",
                    },
                    "& .MuiPaper-root": {
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        paddingTop: '14px',
                    },
                    bgcolor: 'white'
                }}>
                    <Stack sx={{ margin: '24px' }}>
                        <Table openFilter={openFilter} setOpenFilter={setOpenFilter} columns={columns} data={data ?? []} filterExclude={filterExclude}></Table>
                    </Stack>
                </Box>
            </Grid2>

            <Grid2 container className="block md:hidden" marginTop={4}>
                <Box sx={{
                    "& .MuiBox-root": {
                        boxShadow: "0",
                    },
                    "& .MuiPaper-root": {
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        paddingTop: '14px',
                    },
                    bgcolor: 'white'
                }}>
                    <Stack sx={{ margin: '24px' }}>
                        <TableMobile openFilterMobile={openFilterMobile} setOpenFilterMobile={setOpenFilterMobile} data={data ?? []} columns={columnMobile} filterExclude={filterExclude}></TableMobile>
                    </Stack>
                </Box>
            </Grid2>
        </Layout>
    )
}

export default RiwayatOrder 