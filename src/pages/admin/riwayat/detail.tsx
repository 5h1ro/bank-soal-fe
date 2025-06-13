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

interface snackbarProps {
    showSnackBar: snackbarType
    setShowSnackbar: Dispatch<React.SetStateAction<snackbarType>>
}

function RiwayatDetail(props: snackbarProps) {
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
            <Grid2 container alignContent={'center'}>
                <IconButton onClick={() => navigate('/riwayat')}>
                    <RiArrowLeftLine className="w-8 h-8" color="#000000" />
                </IconButton>
                <Typography className="w-10/12 text-4xl font-semibold pt-1">
                    Detail Mitra
                </Typography>
            </Grid2>
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                <Grid2 className="bg-base-white rounded-lg" xs={12}>
                    <Grid2 className="mx-4 my-6">
                        <CustomStepper></CustomStepper>
                    </Grid2>
                    <Stack spacing={3} padding={2}>
                        <Grid2 container>
                            <Typography width={'250px'}>Kode Tes</Typography>
                            <Typography className="text-primary-600 w-full md:w-auto">{id}</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Jenis Tes</Typography>
                            <Typography className="w-full md:w-auto">Intelegensi</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Tanggal</Typography>
                            <Typography className="w-full md:w-auto">{moment('2023-08-17 19:08:45').format('DD MMMM YYYY H:mm:ss')}</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Nama Pengguna</Typography>
                            <Typography className="w-full md:w-auto">John Doe</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Email</Typography>
                            <Typography className="w-full md:w-auto">email@mail.com</Typography>
                        </Grid2>
                        <Divider></Divider>
                        <Grid2 container>
                            <Typography width={'250px'}>Nama Mitra</Typography>
                            <Typography className="w-full md:w-auto">Psikotes Indonesia</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Hasil Tes</Typography>
                            <Typography className="text-danger-500 w-full md:w-auto">Belum Tersedia</Typography>
                        </Grid2>
                        <Divider></Divider>
                        <Grid2 container>
                            <Typography width={'250px'}>Alat Test</Typography>
                            <Grid2 className="w-full md:w-auto -ml-6">
                                <ul>
                                    <li>Alat Tes 1</li>
                                    <li>Alat Tes 2</li>
                                    <li>Alat Tes 3</li>
                                    <li>Alat Tes 4</li>
                                </ul>
                            </Grid2>
                        </Grid2>
                        <Button className='w-24 px-6 py-4 rounded-xl bg-primary-500 text-base-white hover:bg-primary-500 hover:text-base-white' >
                            Upload Hasil Tes
                        </Button>
                    </Stack>
                </Grid2>
            </Grid2>
        </Layout >
    )
}

export default RiwayatDetail 