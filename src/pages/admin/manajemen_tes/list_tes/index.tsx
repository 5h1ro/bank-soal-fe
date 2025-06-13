import { Alert, Box, Button, Chip, Dialog, DialogContent, DialogContentText, IconButton, Snackbar, Stack, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { RiAddLine, RiArrowDownSLine, RiArrowUpSLine, RiDeleteBin7Line, RiEditCircleLine, RiEyeLine, RiMapPin3Line } from "@remixicon/react"
import { MRT_ColumnDef } from "material-react-table"
import moment from "moment-timezone"
import { Dispatch, SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../../../../components/Layout"
import Table from "../../../../components/organism/Table"
import TableMobile from "../../../../components/organism/TableMobile"
import { UppercaseFirstWord } from "../../../../helpers/Converter"
import { snackbarType } from "../../../../interface/snackbar.interface"

interface snackbarProps {
    showSnackBar: snackbarType
    setShowSnackbar: Dispatch<React.SetStateAction<snackbarType>>
}

function ListTes(props: snackbarProps) {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const { showSnackBar, setShowSnackbar } = props;
    const [openFilter, setOpenFilter] = useState<boolean>(false)
    const [openFilterMobile, setOpenFilterMobile] = useState<boolean>(false)
    const filterExclude = ['aksi'];

    const data = [
        {
            id: 'TEST-1234566890',
            title: 'Inteligensi',
            total: 5,
            status: 'active',
        }
    ]

    const columns: MRT_ColumnDef<any>[] = [
        {
            header: 'ID Test',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                return <Typography>{row.original.id}</Typography>
            },
            filterFn: 'equals',
            filterSelectOptions: !data ? [''] : (Array.from(new Set(data.map(data => data.id)))).map(data => data),
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            header: 'Judul',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                return <Typography>{row.original.title}</Typography>
            },
            filterFn: 'equals',
            filterSelectOptions: !data ? [''] : (Array.from(new Set(data.map(data => data.title)))).map(data => data),
            filterVariant: 'select',
            muiFilterTextFieldProps: {
                variant: 'outlined',
            }
        },
        {
            header: 'Alat Tes',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                return <Typography>{`${row.original.total} alat tes`}</Typography>
            },
            filterFn: 'equals',
            filterSelectOptions: !data ? [''] : (Array.from(new Set(data.map(data => `${data.total} alat tes`)))).map(data => data),
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
                    case 'active':
                        status_data = {
                            status: 'Active',
                            style: {
                                bg: 'bg-success-50',
                                text: 'text-success-500'
                            }
                        }
                        break;
                    case 'inactive':
                        status_data = {
                            status: 'Inactive',
                            style: {
                                bg: 'bg-danger-50',
                                text: 'text-danger-500'
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
                    <IconButton className="border-solid border-2 text-secondary-500" aria-label="confirm" onClick={() => navigate(`/manajemen-tes/list-tes/edit/${row.original.id}`)}>
                        <RiEditCircleLine />
                    </IconButton>
                    <IconButton className="border-solid border-2 text-danger-500" aria-label="confirm" onClick={() => {
                        setOpenDialog(true)
                    }}>
                        <RiDeleteBin7Line />
                    </IconButton>
                </div>
            },
            enableColumnFilter: false,
        },
    ];
    const columnMobile: MRT_ColumnDef<any>[] = [
        {
            header: 'ID Test',
            muiTableHeadCellProps: {
                align: 'left',
            },
            muiTableBodyCellProps: {
                align: "left",
            },
            Cell: ({ row }) => {
                let status_data
                switch (row.original.status) {
                    case 'active':
                        status_data = {
                            status: 'Active',
                            style: {
                                bg: 'bg-success-50',
                                text: 'text-success-500'
                            }
                        }
                        break;
                    case 'inactive':
                        status_data = {
                            status: 'Inactive',
                            style: {
                                bg: 'bg-danger-50',
                                text: 'text-danger-500'
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
                                Judul
                            </div>
                            <div className="font-normal mt-2">
                                {row.original.title}
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="font-medium">
                                Alat Tes
                            </div>
                            <div className="font-normal mt-2">
                                {`${row.original.total} alat tes`}
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
                                <IconButton className="border-solid border-2 text-secondary-500" aria-label="confirm" onClick={() => navigate(`/manajemen-tes/list-tes/edit/${row.original.id}`)}>
                                    <RiEditCircleLine />
                                </IconButton>
                                <IconButton className="border-solid border-2 text-danger-500" aria-label="confirm" onClick={() => {
                                    setOpenDialog(true)
                                }}>
                                    <RiDeleteBin7Line />
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
            <Grid2 container justifyContent={'space-between'}>
                <Grid2 container alignContent={'center'}>
                    <Typography className="text-4xl font-semibold mt-[-2px] md:mt-0 md:text-4xl">
                        Manajemen Tes
                    </Typography>
                </Grid2>
                <Grid2 container gap={2}>
                    <Button className="w-full mt-4 bg-primary-600 text-base-white rounded-lg py-4 px-6 hover:bg-primary-600 md:mt-0 md:w-auto gap-2" onClick={() => navigate('/manajemen-tes/list-tes/create')}><RiAddLine /> Tambah</Button>
                </Grid2>
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

export default ListTes 