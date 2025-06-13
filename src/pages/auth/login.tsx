import { memo, useState } from 'react';

//Component
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

//Dependencies
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { Checkbox, FormControlLabel, Snackbar } from '@mui/material';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { useLoginMutation } from '../../api/auth.api';
import { showPasswordState } from '../../utils/recoil-state.util';
import { snackbarType } from '../../interface/snackbar.interface';
import { auth_request } from '../../interface/auth.interface';

const Login = () => {
    const navigate = useNavigate();

    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [errorAccountMessage, setErrorAccountMessage] = useState<any>('');

    const [showPassword, setShowPassword] = useRecoilState(showPasswordState('password'));

    const [loginAccount, { isLoading }] = useLoginMutation();
    const [showSnackbar, setShowSnackbar] = useState<snackbarType>({
        isOpen: false,
        message: '',
        status: 'success'
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues
    } = useForm<auth_request>();
    const onSubmit: SubmitHandler<auth_request> = async (data) => {
        setOpenAlert(false);
        try {
            const profile = await loginAccount(data).unwrap();
            if (profile.status !== 'success') {
                setShowSnackbar({
                    isOpen: true,
                    message: profile.message!,
                    status: 'error'
                })
                if (profile.status === 'not-verified') {
                    const values = getValues();
                    window.location.href = `/register/dikirim/${values.email}`;
                }
            } else {
                if (profile.data?.user_data?.role !== 'participant') {
                    window.location.href = '/dashboard';
                } else {
                    window.location.href = '/login/verifikasi';
                }
                reset();
            }
        } catch (error: any) {
            if (error.status < 500) {
                setErrorAccountMessage(error.data.message);
            }
            else {
                setErrorAccountMessage('Internal Server Error. Code: ' + error.status);
            }
            setOpenAlert(true);
        }
    };

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
                        <Card sx={{ width: '750px', boxShadow: 'none' }} className='flex items-center justify-center md:h-[80.665vh]'>
                            <CardContent className='w-[78.668%]'>
                                <div className='w-full text-center'>
                                    <img
                                        src="/images/logo.png"
                                        alt="Psikotest"
                                        loading="lazy"
                                    />
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Typography align="center" className='text-[46px] font-semibold'>
                                        Masuk
                                    </Typography>
                                    <Typography align="center" className='text-base font-normal text-general-500'>
                                        Silahkan masukkan akun kamu disini
                                    </Typography>
                                    <Stack spacing={3}>
                                        <Alert onClose={() => setOpenAlert(false)} severity="error" sx={{ display: openAlert ? 'inherit' : 'none', boxShadow: 'none' }}>{errorAccountMessage}</Alert>
                                        <Stack>
                                            <Typography>
                                                Email <span className='text-danger-500'>*</span>
                                            </Typography>
                                            <TextField
                                                className='mt-2'
                                                autoFocus
                                                type="email"
                                                id="email"
                                                variant="outlined"
                                                placeholder='Masukkan Email'
                                                error={errors.email ? true : false}
                                                helperText={errors.email && 'Wajib Diisi'}
                                                {...register("email", {
                                                    required: true,
                                                })}
                                            />
                                        </Stack>
                                        <Stack>
                                            <Typography>
                                                Password <span className='text-danger-500'>*</span>
                                            </Typography>
                                            <TextField
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                variant="outlined"
                                                placeholder='Masukkan Password'
                                                className='mt-2'
                                                error={errors.password ? true : false}
                                                helperText={errors.password && 'Wajib Diisi'}
                                                {...register("password", {
                                                    required: true,
                                                })}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => {
                                                                    setShowPassword(!showPassword);
                                                                }}
                                                            >
                                                                {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Stack>
                                        <Grid container>
                                            <Grid>
                                                <FormControlLabel control={<Checkbox defaultChecked />} label="Simpan Password" />
                                            </Grid>
                                            <Grid mdOffset="auto" alignSelf={"center"} className='cursor-pointer' onClick={() => navigate('/lupa-password')}>
                                                <Typography className='text-primary-500' >
                                                    Lupa Password?
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        {!isLoading && (
                                            <Button type="submit" className='text-lg text-base-white bg-primary-500 hover:bg-primary-700 font-medium rounded-xl p-4' variant="contained">
                                                Masuk
                                            </Button>
                                        )}
                                        {isLoading && (
                                            <LoadingButton
                                                loading
                                                loadingIndicator='Loading...'
                                                variant="outlined"
                                                className='text-lg font-medium rounded-xl p-4'
                                            >Loading...</LoadingButton>
                                        )}
                                        <Typography align="center" className='font-size-14 font-weight-normal color-black-06'>Belum Punya Akun? <span className='text-primary-500 cursor-pointer' onClick={() => navigate('/register')}>Daftar</span></Typography>
                                    </Stack>
                                </form>
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

export default memo(Login)