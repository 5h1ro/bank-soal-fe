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
import { useNavigate } from "react-router-dom";
import { getCookie } from '../../utils/cookies';
import { useVerifyAccount2faMutation } from '../../api/auth.api';
import { snackbarType } from '../../interface/snackbar.interface';
import OTPInput from '../../components/molecules/OtpInput';

const VerifikasiLogin = () => {
    const navigate = useNavigate();
    const email = getCookie('email');
    const [otp, setOtp] = useState('')
    const [verify, { isLoading }] = useVerifyAccount2faMutation();
    const onChange = async () => {
        try {
            const data = {
                email,
                otp
            }
            await verify(data).unwrap();
            window.location.href = '/';
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
    }
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
                            <CardContent className='w-[78.668%]'>
                                <div className='w-full text-center'>
                                    <img
                                        src="/images/logo.png"
                                        alt="Psikotest"
                                        loading="lazy"
                                    />
                                </div>
                                <Typography align="center" className='text-[46px] font-semibold'>
                                    Verifikasi Login
                                </Typography>
                                <Typography align="center" className='text-base font-normal text-general-500'>
                                    Masukkan kode OTP yang dikirim ke email {email}
                                </Typography>
                                <Grid container marginTop={'24px'}>
                                    <Grid container marginX={'auto'}>
                                        <OTPInput otp={otp} setOtp={setOtp} />
                                    </Grid>
                                </Grid>
                                <Grid marginTop={'24px'}>
                                    {!isLoading && (
                                        <Button onClick={onChange} className='text-lg text-base-white bg-primary-500 hover:bg-primary-500 font-medium rounded-xl p-4 w-full shadow-none hover:shadow-none' variant="contained">
                                            Masuk
                                        </Button>
                                    )}
                                    {isLoading && (
                                        <LoadingButton
                                            loading
                                            loadingIndicator='Loading...'
                                            variant="outlined"
                                            className='text-lg font-medium rounded-xl p-4 w-full shadow-none hover:shadow-none'
                                        >Loading...</LoadingButton>
                                    )}
                                    <Button className='mt-6 text-lg text-primary-500 bg-base-white hover:bg-base-white font-medium rounded-xl p-4 w-full shadow-none hover:shadow-none' variant="contained" onClick={() => navigate('/login')}>
                                        Ganti Email
                                    </Button>
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

export default VerifikasiLogin