import { Alert, Snackbar } from '@mui/material';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVerifyAccountMutation } from '../../api/auth.api';
import { snackbarType } from '../../interfaces/snackbar.interface';

const EmailVerifikasi = () => {
    const navigate = useNavigate();
    const { userID, token } = useParams();
    const [verifyAccount, { isLoading }] = useVerifyAccountMutation();
    const [showSnackbar, setShowSnackbar] = useState<snackbarType>({
        isOpen: false,
        message: '',
        status: 'success'
    });
    useEffect(() => {
        const data = {
            user_id: userID,
            token,
        }
        verifyAccount(data).unwrap().catch((error: any) => {
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
        });
    }, [])


    return (
        <Grid2 className='w-[100vw] h-[100vh] bg-primary-500'>
            <div className="w-full h-full bg-center bg-no-repeat bg-cover flex" style={{
                backgroundImage: "url('/images/error-pattern.png')"
            }}>
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
                <Grid2 className='bg-base-white mx-4 md:mx-auto md:w-[750px] md:h-[434px] rounded-md my-auto py-16 px-8 md:p-16 justify-center'>
                    <Grid2 container>
                        <img src="/icons/verif.svg" className='mx-auto w-[112px] h-[112px]' />
                    </Grid2>
                    <Typography fontWeight={600} className='text-2xl md:text-4xl' align='center'>
                        Akun Berhasil Diverifikasi
                    </Typography>
                    <Typography align='center' className='mt-4'>Akunmu telah terverifikasi, silahkan login ulang untuk mengakses aplikasi</Typography>
                    <Grid2 xs display="flex" justifyContent="center" alignItems="center" className='mt-4'>
                        <Button size="large" onClick={() => navigate('/login')} variant="contained" className='text-base-white rounded-lg shadow-none p-4'>
                            Login Sekarang
                        </Button>
                    </Grid2>
                </Grid2>
            </div>
        </Grid2>
    )
}

export default EmailVerifikasi