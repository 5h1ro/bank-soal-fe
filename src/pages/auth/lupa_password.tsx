import { useState } from 'react';

//Component
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

//Dependencies
import { LoadingButton } from '@mui/lab';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useForgotMutation } from '../../api/auth.api';
import { snackbarType } from '../../interfaces/snackbar.interface';

const LupaPassword = () => {
    const navigate = useNavigate();
    const [forgot, { isLoading }] = useForgotMutation();
    const [email, setEmail] = useState('')
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
                                    Lupa Password
                                </Typography>
                                <Typography align="center" className='text-base font-normal text-general-500'>
                                    Kami akan mengirimkan link reset password ke emailmu
                                </Typography>
                                <Grid marginTop={'24px'}>
                                    <Typography>
                                        Email <span className='text-danger-500'>*</span>
                                    </Typography>
                                    <TextField
                                        className='mt-2 w-full'
                                        autoFocus
                                        type="email"
                                        id="email"
                                        onChange={(data) => setEmail(data.target.value)}
                                        variant="outlined"
                                        placeholder='Masukkan Email'
                                    />
                                </Grid>
                                <Grid marginTop={'24px'}>
                                    {!isLoading &&
                                        (<Button onClick={
                                            () => {
                                                forgot(email).unwrap().then((data) => {
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
                                                })
                                            }} type="submit" className='text-lg text-base-white bg-primary-500 hover:bg-primary-500 font-medium rounded-xl p-4 w-full shadow-none hover:shadow-none' variant="contained">
                                            Kirim Link
                                        </Button>)
                                    }
                                    {isLoading && (<LoadingButton
                                        loading
                                        loadingIndicator='Loading...'
                                        variant="outlined"
                                        className='text-lg text-base-white font-medium rounded-xl p-4 w-full shadow-none hover:shadow-none'
                                    >Loading...</LoadingButton>)
                                    }
                                    <Button onClick={() => navigate('/login')} type="button" className='mt-6 text-lg text-primary-500 bg-base-white hover:bg-base-white font-medium rounded-xl p-4 w-full shadow-none hover:shadow-none' variant="contained">
                                        Kembali ke Login
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

export default LupaPassword