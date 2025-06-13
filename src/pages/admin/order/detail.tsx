import { Alert, Box, Button, Checkbox, Chip, Divider, FormControlLabel, IconButton, Radio, RadioGroup, Snackbar, Stack, TextField, Typography } from "@mui/material";
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

function OrderDetail(props: snackbarProps) {
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
                    <IconButton onClick={() => navigate('/order')}>
                        <RiArrowLeftLine className="w-8 h-8" color="#000000" />
                    </IconButton>
                    <Typography className="text-4xl font-semibold self-center">
                        Order Transaksi
                    </Typography>
                </Grid2>
            </Grid2>
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                <Grid2 className="bg-base-white rounded-lg" xs={12}>
                    <Stack spacing={3} padding={2}>
                        <Grid2 container>
                            <Typography width={'250px'}>Jenis Tes</Typography>
                            <Typography className="w-full md:w-auto">Intelligenz Struktur Test (IST)</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Kategori</Typography>
                            <Typography className="w-full md:w-auto">Intelegensi/Kognitif</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Harga</Typography>
                            <Typography className="text-primary-600 w-full md:w-auto">{
                                Currency({ value: 100000 })
                            }</Typography>
                        </Grid2>
                        <Divider></Divider>
                        <Grid2 container>
                            <Typography width={'250px'} className="font-bold">Item Add On</Typography>
                        </Grid2>
                        <Stack spacing={1}>
                            <Grid2 container className="items-center">
                                <Checkbox className="-ml-3" />
                                <Typography width={'250px'}>Hasil Express</Typography>
                                <Typography className="w-full md:w-auto">{Currency({ value: 100000 })}</Typography>
                            </Grid2>
                            <Grid2 container className="items-center">
                                <Checkbox className="-ml-3" />
                                <Typography width={'250px'}>Retake Test</Typography>
                                <Typography className="w-full md:w-auto">{Currency({ value: 100000 })}</Typography>
                            </Grid2>
                            <Grid2 container className="items-center">
                                <Checkbox className="-ml-3" />
                                <Typography width={'250px'}>Dokumen Orginal</Typography>
                                <Typography className="w-full md:w-auto">{Currency({ value: 100000 })}</Typography>
                            </Grid2>
                        </Stack>
                        <Divider></Divider>
                        <Grid2 container>
                            <Typography width={'250px'} className="font-bold">Sistem Pengerjaan</Typography>
                        </Grid2>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="onsite"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="onsite" control={<Radio />} sx={{ alignItems: 'flex-start' }} label={
                                <Box>
                                    <Typography className="flex h-10 items-center">On Site</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Tes psikotes yang dilakukan secara langsung di lokasi biro psikologi, dengan pengawasan langsung dari psikolog atau asisten psikolog.
                                    </Typography>
                                </Box>
                            } />
                            <FormControlLabel value="online" control={<Radio />} sx={{ alignItems: 'flex-start' }} label={
                                <Box>
                                    <Typography className="flex h-10 items-center">Online</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Tes psikotes yang dilakukan melalui platform digital secara daring (online), bisa diakses dari lokasi manapun dengan koneksi internet.
                                    </Typography>
                                </Box>
                            } />
                        </RadioGroup>
                    </Stack>
                </Grid2>
            </Grid2>
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                <Grid2 className="bg-base-white rounded-lg p-6 justify-between" xs={12} container>
                    <Grid2>
                        <Typography width={'250px'}>Total</Typography>
                        <Typography className="text-primary-600 w-full md:w-auto font-semibold">{
                            Currency({ value: 300000 })
                        }</Typography>
                    </Grid2>
                    <Grid2 className="bg-primary-600 text-center align-center flex items-center rounded-lg py-4 px-6">
                        <Typography className="text-base-white">
                            Lanjutkan
                        </Typography>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Layout >
    )
}

export default OrderDetail 