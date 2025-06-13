import { Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Snackbar, Stack, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { RiArrowDownSLine, RiArrowDropDownLine, RiArrowUpSLine, RiDeleteBin7Line, RiDownload2Fill, RiDownloadCloudFill, RiDownloadFill, RiEditCircleLine, RiEyeLine, RiMapPin3Line } from "@remixicon/react"
import { MRT_ColumnDef } from "material-react-table"
import moment from "moment-timezone"
import { Dispatch, SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../../../components/Layout"
import Table from "../../../components/organism/Table"
import TableMobile from "../../../components/organism/TableMobile"
import { UppercaseFirstWord } from "../../../helpers/Converter"
import { snackbarType } from "../../../interface/snackbar.interface"
import { ArrowDownwardOutlined, ArrowDropDownOutlined, Description } from "@mui/icons-material"
import Currency from "../../../components/atoms/Currency"

interface snackbarProps {
    showSnackBar: snackbarType
    setShowSnackbar: Dispatch<React.SetStateAction<snackbarType>>
}

function Deposit(props: snackbarProps) {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openTopupDialog, setOpenTopupDialog] = useState<boolean>(false)
    const [openSnKDialog, setOpenSnKDialog] = useState<boolean>(false)
    const { showSnackBar, setShowSnackbar } = props;
    const [openFilter, setOpenFilter] = useState<boolean>(false)
    const [openFilterMobile, setOpenFilterMobile] = useState<boolean>(false)
    const filterExclude = ['aksi'];
    const role = import.meta.env.VITE_API_ROLE
    const data = [
        {
            id: 'TX-12345-67890-001',
            date: '2023-08-17 19:08:45',
            name: 'John Doe',
            status: 'success',
            nominal: 100000,
            saldo_awal: 100000,
            saldo_akhir: 100000
        }
    ]

    const columns: MRT_ColumnDef<any>[] = [
        {
            header: 'Kode Transaksi',
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
        ...(role !== 'peserta'
            ? [{
                header: 'Nama Pengguna',
                muiTableHeadCellProps: { align: 'left' as const },
                muiTableBodyCellProps: { align: "left" as const },
                Cell: ({ row }: any) => (
                    <Typography>{row.original.name}</Typography>
                ),
                filterFn: 'equals',
                filterSelectOptions: !data ? [''] : Array.from(new Set(data.map(data => data.name))),
                filterVariant: 'select' as const,
                muiFilterTextFieldProps: { variant: 'outlined' as const }
            }]
            : []),
        {
            header: 'Nominal',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                return <Typography>{Currency({ value: row.original.nominal })}</Typography>
            },
            filterFn: 'equals',
            filterSelectOptions: !data ? [''] : (Array.from(new Set(data.map(data => Currency({ value: data.nominal }))))).map(data => data),
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        ...(role === 'peserta'
            ? [
                {
                    header: 'Saldo Awal',
                    muiTableHeadCellProps: {
                        align: 'left' as const,
                    },
                    muiTableBodyCellProps: {
                        align: "left" as const,
                    },
                    Cell: ({ row }: any) => {
                        return <Typography>{Currency({ value: row.original.saldo_awal })}</Typography>
                    },
                    filterFn: 'equals' as const,
                    filterSelectOptions: !data ? [''] : (Array.from(new Set(data.map(data => Currency({ value: data.saldo_awal }))))).map(data => data),
                    filterVariant: 'select' as const,
                    muiFilterTextFieldProps: {
                        variant: 'outlined' as const,
                    }
                },
                {
                    header: 'Saldo Akhir',
                    muiTableHeadCellProps: {
                        align: 'left' as const,
                    },
                    muiTableBodyCellProps: {
                        align: "left" as const,
                    },
                    Cell: ({ row }: any) => {
                        return <Typography>{Currency({ value: row.original.saldo_akhir })}</Typography>
                    },
                    filterFn: 'equals' as const,
                    filterSelectOptions: !data ? [''] : (Array.from(new Set(data.map(data => Currency({ value: data.saldo_akhir }))))).map(data => data),
                    filterVariant: 'select' as const,
                    muiFilterTextFieldProps: {
                        variant: 'outlined' as const,
                    }
                }
            ]
            : []),
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
                    case 'success':
                        status_data = {
                            status: 'Berhasil',
                            style: {
                                bg: 'bg-success-50',
                                text: 'text-success-500'
                            }
                        }
                        break;
                    case 'pending':
                        status_data = {
                            status: 'Pending',
                            style: {
                                bg: 'bg-warning-50',
                                text: 'text-warning-500'
                            }
                        }
                        break;
                    case 'failed':
                        status_data = {
                            status: 'Gagal',
                            style: {
                                bg: 'bg-secondary-50',
                                text: 'text-secondary-500'
                            }
                        }
                        break;
                    default:
                        status_data = {
                            status: 'Tidak Diketahui',
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
                return <div className='flex gap-2'>
                    <IconButton className="border-solid border-2 text-primary-500" aria-label="confirm" onClick={() => navigate(`/deposit/${row.original.id}`)}>
                        <RiEyeLine />
                    </IconButton>
                </div>
            },
            enableColumnFilter: false,
        },
    ];
    const columnMobile: MRT_ColumnDef<any>[] = [
        {
            header: 'Kode Pembayaran',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                let status_data
                switch (row.original.status) {
                    case 'success':
                        status_data = {
                            status: 'Berhasil',
                            style: {
                                bg: 'bg-success-50',
                                text: 'text-success-500'
                            }
                        }
                        break;
                    case 'pending':
                        status_data = {
                            status: 'Pending',
                            style: {
                                bg: 'bg-warning-50',
                                text: 'text-warning-500'
                            }
                        }
                        break;
                    case 'failed':
                        status_data = {
                            status: 'Gagal',
                            style: {
                                bg: 'bg-secondary-50',
                                text: 'text-secondary-500'
                            }
                        }
                        break;
                    default:
                        status_data = {
                            status: 'Tidak Diketahui',
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
                                Nama Pengguna
                            </div>
                            <div className="font-normal mt-2">
                                {row.original.name}
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="font-medium">
                                Nominal
                            </div>
                            <div className="font-normal mt-2">
                                {Currency({ value: row.original.description })}
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
                                <IconButton className="border-solid border-2 text-primary-500" aria-label="confirm" onClick={() => navigate(`/deposit/${row.original.id}`)}>
                                    <RiEyeLine />
                                </IconButton>
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
    const nominal = [100000, 200000, 300000, 400000, 500000, 750000]
    const [nominalSelected, setNominalSelected] = useState(0)
    return (
        <Layout>
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

            <Dialog
                maxWidth='sm'
                fullWidth
                aria-labelledby="alert-CreateKodePromo-title"
                aria-describedby="alert-CreateKodePromo-description"
                keepMounted
                open={openTopupDialog}
            >
                <DialogTitle id="alert-CreateKodePromo-title" className='text-xl text-black font-semibold'>
                    Pilih Nominal
                </DialogTitle>
                <DialogContent>
                    <Grid2 container gap={2} className='mt-2' justifyContent={'space-between'}>
                        {
                            nominal.map((v) => {
                                return <Grid2 container className={`w-[16.5rem] cursor-pointer outline ${v == nominalSelected ? 'outline-2 outline-primary-500 text-primary-500 bg-primary-50' : 'outline-1 outline-general-200'} rounded-lg`} onClick={() => setNominalSelected(v)}>
                                    <Typography className="py-6 px-6 font-semibold">
                                        {Currency({ value: v })}
                                    </Typography>
                                </Grid2>
                            })
                        }
                    </Grid2>
                </DialogContent>
                <DialogActions className="mb-4">
                    <Button onClick={() => {
                        setOpenSnKDialog(true)
                        setOpenTopupDialog(false)
                    }} className='text-base bg-primary-500 text-base-white hover:bg-primary-500 hover:text-base-white py-4 px-6 rounded-lg'>Bayar Sekarang</Button>
                    <Button onClick={() => setOpenTopupDialog(false)} className='text-base bg-base-white text-general-500 hover:bg-base-white hover:text-general-500 py-4 px-6 rounded-lg'>
                        Batal
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                maxWidth='md'
                fullWidth
                aria-labelledby="alert-CreateKodePromo-title"
                aria-describedby="alert-CreateKodePromo-description"
                keepMounted
                open={openSnKDialog}
            >
                <DialogTitle id="alert-CreateKodePromo-title" className='text-xl text-black font-semibold'>
                    ⚠️ Syarat & Ketentuan
                </DialogTitle>
                <DialogContent>
                    <Grid2 className='mt-2'>
                        <Typography>
                            Dengan melakukan deposit, Anda menyetujui bahwa:
                            <ul>
                                <li>Dana yang telah didepositkan tidak dapat ditarik kembali (non-refundable) dalam bentuk apa pun.</li>
                                <li>Seluruh dana hanya dapat digunakan untuk pembelian alat tes yang tersedia di platform ini.</li>
                                <li>Mohon pastikan keputusan deposit Anda telah dipertimbangkan secara matang sebelum melanjutkan.</li>
                            </ul>
                            Dengan melanjutkan, Anda telah membaca dan menyetujui Syarat & Ketentuan ini.
                        </Typography>
                    </Grid2>
                </DialogContent>
                <DialogActions className="mb-4">
                    <Button onClick={() => {

                    }} className='text-base bg-primary-500 text-base-white hover:bg-primary-500 hover:text-base-white py-4 px-6 rounded-lg'>Bayar Sekarang</Button>
                    <Button onClick={() => setOpenSnKDialog(false)} className='text-base bg-base-white text-general-500 hover:bg-base-white hover:text-general-500 py-4 px-6 rounded-lg'>
                        Batal
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid2 container alignContent={'center'} className="w-full justify-between">
                <Grid2 container>
                    <Typography className="text-4xl font-semibold">
                        Deposit
                    </Typography>
                </Grid2>
                <Button onClick={() => setOpenTopupDialog(true)} className='px-6 py-4 rounded-xl bg-primary-500 text-base-white hover:bg-primary-500 hover:text-base-white float-end' >
                    Top up
                </Button>
            </Grid2>
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

export default Deposit 