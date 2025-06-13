import { Alert, Box, Button, Chip, Divider, IconButton, Snackbar, Stack, Step, StepContent, StepLabel, Stepper, TextField, Typography } from "@mui/material";
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

function RiwayatOrderDetail(props: snackbarProps) {
    const { id } = useParams()
    const { showSnackBar, setShowSnackbar } = props;
    const [showSnackbarLocal, setShowSnackbarLocal] = useState<snackbarType>({
        isOpen: false,
        message: '',
        status: 'success'
    });
    const navigate = useNavigate();

    const steps = [
        {
            label: 'Inteligensi A',
            description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
        },
        {
            label: 'Inteligensi B',
            description:
                'An ad group contains one or more ads which target a shared set of keywords.',
        },
        {
            label: 'Inteligensi C',
            description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
        },
    ];
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
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
                <IconButton onClick={() => navigate('/riwayat-order')}>
                    <RiArrowLeftLine className="w-8 h-8" color="#000000" />
                </IconButton>
                <Typography className="w-10/12 text-4xl font-semibold pt-1">
                    Detail Pengerjaan
                </Typography>
            </Grid2>
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                <Grid2 className="bg-base-white rounded-lg" xs={12}>
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
                            <Typography width={'250px'}>Tanggal Order</Typography>
                            <Typography className="w-full md:w-auto">{moment('2023-08-17 19:08:45').format('DD MMMM YYYY H:mm:ss')}</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Tanggal Tes Dimulai</Typography>
                            <Typography className="w-full md:w-auto">{moment('2023-08-17 19:08:45').format('DD MMMM YYYY H:mm:ss')}</Typography>
                        </Grid2>
                        <Grid2 container>
                            <Typography width={'250px'}>Pelanggaran</Typography>
                            <Typography className="text-primary-500 cursor-pointer" onClick={() => navigate('/riwayat-pelanggaran')}>Lihat Pelanggaran</Typography>
                        </Grid2>
                    </Stack>
                </Grid2>
                <Grid2 className="bg-base-white rounded-lg mt-4" xs={12}>
                    <Stack spacing={3} padding={2}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel>
                                        <Grid2 className="ml-2">
                                            {step.label}
                                            <Grid2 container className="font-normal text-general-500 mt-1" gap={2}>
                                                <Grid2>
                                                    <Grid2>Tanggal Mulai</Grid2>
                                                    <Grid2>10.15</Grid2>
                                                </Grid2>
                                                <Grid2>
                                                    <Grid2>Tanggal Mulai</Grid2>
                                                    <Grid2>10.15</Grid2>
                                                </Grid2>
                                            </Grid2>
                                        </Grid2>
                                    </StepLabel>
                                    {/* <StepContent>
                                        <Box sx={{ mb: 2 }}>
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </Box>
                                    </StepContent> */}
                                </Step>
                            ))}
                        </Stepper>
                    </Stack>
                </Grid2>
            </Grid2>
        </Layout >
    )
}

export default RiwayatOrderDetail 