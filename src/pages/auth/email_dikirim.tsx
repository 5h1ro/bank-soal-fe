import { useState } from 'react';

//Component
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

//Dependencies
import { LoadingButton } from '@mui/lab';
import { Alert, Button, Snackbar } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { useForgotMutation } from '../../api/auth.api';
import { snackbarType } from '../../interfaces/snackbar.interface';

const EmailDikirim = () => {
    const navigate = useNavigate();
    const { email } = useParams();
    const [forgot, { isLoading }] = useForgotMutation();
    const [showSnackbar, setShowSnackbar] = useState<snackbarType>({
        isOpen: false,
        message: '',
        status: 'success'
    });

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={showSnackbar.isOpen} autoHideDuration={6000} onClose={() => setShowSnackbar({ isOpen: false, message: '', status: 'error' })}>
                <Alert
                    onClose={() => setShowSnackbar({ isOpen: false, message: '', status: 'error' })}
                    className={(showSnackbar.status === 'success' ? 'bg-success-500' : 'bg-danger-500') + ' w-[85vw] md:w-[496px]'}
                    variant="filled"
                >
                    {showSnackbar.message}
                </Alert>
            </Snackbar>
            <Box>
                <Grid container minHeight={'92vh'}>
                    <Grid container marginX={'auto'} marginY={'auto'}>
                        <Card sx={{ width: '750px', minHeight: '80.665vh', boxShadow: 'none' }} className='flex items-center justify-center'>
                            <CardContent className='w-[84%]'>
                                <div className='w-full text-center'>
                                    <img
                                        src="/images/logo.png"
                                        alt="Psikotest"
                                        loading="lazy"
                                    />
                                </div>
                                <div className='w-full text-center'>
                                    <img
                                        src="/icons/email_sending.svg"
                                        alt="Psikotest"
                                        loading="lazy"
                                    />
                                </div>
                                <Typography align="center" className='text-[46px] font-semibold'>
                                    Email Telah Dikirim
                                </Typography>
                                <Typography align="center" className='text-base font-normal text-general-500'>
                                    Kami telah mengirim email reset password ke email {email}. Mohon check kotak masuk, sosial, promosi ataupun kotak spam
                                </Typography>
                                <Grid marginTop={'24px'}>
                                    <Typography align="center" className='font-size-14 font-weight-normal text-general-500 mt-6'>Belum menerima email?</Typography>
                                    <Grid className='w-full justify-center flex'>
                                        {!isLoading && (
                                            <Button onClick={
                                                () =>
                                                    forgot(email!).unwrap().then((data) => {
                                                        navigate(`/lupa-password/dikirim/${email}`)
                                                    }).finally().catch((error: any) => {
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
                                                    })} className='mt-6 text-lg text-base-white bg-primary-500 hover:bg-primary-500 font-medium rounded-xl p-4 shadow-none hover:shadow-none' variant="contained">
                                                Kirim Ulang
                                            </Button>
                                        )}
                                        {isLoading && (
                                            <LoadingButton
                                                loading
                                                loadingIndicator='Loading...'
                                                variant="outlined"
                                                className='mt-6 text-lg font-medium rounded-xl p-4 shadow-none hover:shadow-none'
                                            >Loading...</LoadingButton>
                                        )}
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container justifyContent={'center'} className='py-6 bg-base-white'>
                    <Typography fontSize={16} fontWeight={500} className='text-center px-2'>Copyright ©2024 Psikotes Gratis, All rights Reserved</Typography>
                </Grid>
            </Box>
        </>
    )
}

export default EmailDikirim