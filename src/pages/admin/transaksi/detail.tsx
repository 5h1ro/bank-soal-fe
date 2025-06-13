import { Alert, Box, Button, Chip, Divider, IconButton, Snackbar, Stack, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Dispatch, useState } from "react";
import { RiArrowLeftLine, RiUserLine } from "@remixicon/react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import UseSwitchesCustom from "../../../components/atoms/Switch";
import { snackbarType } from "../../../interface/snackbar.interface";
import TabPanel from "../../../components/organism/TabPanel";
import CustomTabPanel from "../../../components/molecules/CustomTabPanel";
import DetailElement from "../../../components/atoms/DetailElement";
import CustomStepper from "../../../components/organism/Stepper";
import moment from "moment";
import Currency from "../../../components/atoms/Currency";

interface snackbarProps {
    showSnackBar: snackbarType
    setShowSnackbar: Dispatch<React.SetStateAction<snackbarType>>
}

function TransaksiDetail(props: snackbarProps) {
    const { id } = useParams()
    const { showSnackBar, setShowSnackbar } = props;
    const [showSnackbarLocal, setShowSnackbarLocal] = useState<snackbarType>({
        isOpen: false,
        message: '',
        status: 'success'
    });
    const navigate = useNavigate();
    return (
        <Layout>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={showSnackbarLocal.isOpen} autoHideDuration={6000} onClose={() => setShowSnackbarLocal({ isOpen: false, message: '', status: 'error' })}>
                <Alert
                    onClose={() => setShowSnackbarLocal({ isOpen: false, message: '', status: 'error' })}
                    className={(showSnackbarLocal.status === 'success' ? 'bg-success-500' : 'bg-danger-500') + ' w-[85vw] md:w-[496px]'}
                    variant="filled"
                >
                    {showSnackbarLocal.message}
                </Alert>
            </Snackbar>
            <Grid2 container alignContent={'center'} className="w-full justify-between">
                <Grid2 container>
                    <IconButton onClick={() => navigate('/transaksi')}>
                        <RiArrowLeftLine className="w-8 h-8" color="#000000" />
                    </IconButton>
                    <Typography className="text-4xl font-semibold self-center">
                        Detail Transaksi
                    </Typography>
                </Grid2>
                <Button className='px-6 py-4 rounded-xl bg-primary-500 text-base-white hover:bg-primary-500 hover:text-base-white float-end' >
                    Download Bukti Transaksi
                </Button>
            </Grid2>
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                <Grid2 className="bg-base-white rounded-lg" xs={12}>
                    <Stack spacing={3} padding={2}>
                        <Grid2 container>
                            <Typography width={'250px'}>Deskripsi</Typography>
                            <Typography className="w-full md:w-auto">Pembelian Paket</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography className=" self-center" width={'250px'}>Status</Typography>
                            <div className="font-normal">
                                <Chip label={'Pending'} className={`bg-warning-50 text-warning-500 rounded-md`} />
                            </div>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Kode Transaksi</Typography>
                            <Typography className="text-primary-600 w-full md:w-auto">TRX-1234566890</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Tanggal Bayar</Typography>
                            <Typography className="w-full md:w-auto">{moment('2023-08-17 19:08:45').format('DD MMMM YYYY H:mm:ss')}</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Metode Pembayaran</Typography>
                            <Typography className="w-full md:w-auto">Saldo Deposit</Typography>
                        </Grid2>
                        <Divider></Divider>
                        <Grid2 container>
                            <Typography width={'250px'} className="font-bold">Item Transaksi</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Intelligenz Struktur Test (IST)</Typography>
                            <Typography className="w-full md:w-auto">{Currency({ value: 100000 })}</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Intelligenz Struktur Test (IST)</Typography>
                            <Typography className="w-full md:w-auto">{Currency({ value: 100000 })}</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Intelligenz Struktur Test (IST)</Typography>
                            <Typography className="w-full md:w-auto">{Currency({ value: 100000 })}</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Intelligenz Struktur Test (IST)</Typography>
                            <Typography className="w-full md:w-auto">{Currency({ value: 100000 })}</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'} className="text-primary-500">Total</Typography>
                            <Typography className="w-full md:w-auto text-primary-500">{Currency({ value: 100000 })}</Typography>
                        </Grid2>
                    </Stack>
                </Grid2>
            </Grid2>
        </Layout >
    )
}

export default TransaksiDetail 