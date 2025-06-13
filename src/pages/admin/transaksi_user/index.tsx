import { Alert, Box, Button, Chip, Dialog, DialogContent, DialogContentText, Grid, IconButton, Snackbar, Stack, Typography } from "@mui/material"
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

function TransaksiUser(props: snackbarProps) {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const { showSnackBar, setShowSnackbar } = props;
    const [openFilter, setOpenFilter] = useState<boolean>(false)
    const [openFilterMobile, setOpenFilterMobile] = useState<boolean>(false)
    const filterExclude = ['aksi'];

    const data = [
        {
            id: 'TX-12345-67890-001',
            date: '2023-08-17 19:08:45',
            description: 'Pembelian Tes Intelegensi',
            nominal: 100000,
            status: 'success',
        },
        {
            id: 'TX-12345-67890-001',
            date: '2023-08-17 19:08:45',
            description: 'Pembelian Paket',
            nominal: 100000,
            status: 'failed',
        },
        {
            id: 'TX-12345-67890-001',
            date: '2023-08-17 19:08:45',
            description: 'Pembelian Paket',
            nominal: 100000,
            status: 'pending',
        },
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
        {
            header: 'Deskripsi',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                return <Typography>{row.original.description}</Typography>
            },
            filterFn: 'equals',
            filterSelectOptions: !data ? [''] : (Array.from(new Set(data.map(data => data.description)))).map(data => data),
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
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
                    <IconButton className="border-solid border-2 text-primary-500" aria-label="confirm" onClick={() => navigate(`/transaksi-user/${row.original.id}`)}>
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
                                Deskripsi
                            </div>
                            <div className="font-normal mt-2">
                                {row.original.description}
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
                                <IconButton className="border-solid border-2 text-primary-500" aria-label="confirm" onClick={() => navigate(`/transaksi/${row.original.id}`)}>
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
            <Typography className="text-4xl font-semibold">
                Transaksi User
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

export default TransaksiUser 