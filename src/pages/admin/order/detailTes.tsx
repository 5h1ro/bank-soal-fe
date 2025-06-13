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

function OrderDetailTes(props: snackbarProps) {
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
                        Detail Tes
                    </Typography>
                </Grid2>
            </Grid2>
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                <Grid2 className="bg-base-white rounded-lg p-6" xs={12}>
                    <Grid2 container justifyContent={'space-between'}>
                        <Typography className="text-general-400">Inteligensi/ Kognitif</Typography>
                        <Typography className="text-general-400">Metode: On Site</Typography>
                    </Grid2>
                    <Typography className="text-xl font-semibold mt-2">Culture Fair Intelligence Test (CFIT)</Typography>
                    <Typography className="font-semibold mt-2 text-primary-500">{Currency({ value: 300000 })}</Typography>
                    <Typography className="mt-4 leading-7">
                        Culture Fair Intelligence Test (CFIT) adalah alat pengukuran kecerdasan yang dirancang untuk mengurangi pengaruh faktor budaya dan lingkungan dalam penilaian kemampuan kognitif seseorang. CFIT dirancang untuk meminimalkan ketidaksetaraan dalam pengukuran kecerdasan antarindividu yang disebabkan oleh perbedaan latar belakang budaya, sosial, dan pendidikan.
                    </Typography>
                    <Typography className="mt-4 leading-7">
                        CFIT mengukur berbagai aspek kecerdasan, termasuk kemampuan verbal, numerik, dan spasial, dengan menggunakan gambar-gambar, pola-pola, dan simbol-simbol yang memiliki sedikit atau bahkan tidak ada keterkaitan dengan budaya tertentu. Dengan demikian, CFIT memungkinkan evaluasi kemampuan kognitif seseorang tanpa terlalu bergantung pada pengetahuan dan pengalaman budaya spesifik.
                    </Typography>
                    <Typography className="mt-4 leading-7">
                        Instrumen ini biasanya digunakan dalam konteks penilaian psikologis, pendidikan, dan seleksi personal untuk memperoleh gambaran yang lebih objektif tentang kemampuan intelektual seseorang. Dengan pendekatan yang lebih netral terhadap budaya, CFIT dapat memberikan hasil yang lebih adil dan akurat, terutama dalam situasi di mana keberagaman budaya dan latar belakang individu menjadi faktor penting.
                    </Typography>
                    <Grid2 className="bg-primary-500 text-center w-fit mt-4 align-center flex items-center rounded-lg py-4 px-6">
                        <Typography className="text-base-white">
                            Download Contoh Laporan
                        </Typography>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Layout >
    )
}

export default OrderDetailTes 