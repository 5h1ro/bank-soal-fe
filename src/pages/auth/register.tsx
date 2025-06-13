import { useState } from 'react';

//Component
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

//Dependencies
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, Button, Checkbox, FormControlLabel, FormLabel, IconButton, InputAdornment, Radio, RadioGroup, Snackbar, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { useRegisterMutation } from '../../api/auth.api';
import { showPasswordState } from '../../utils/recoil-state.util';
import { snackbarType } from '../../interface/snackbar.interface';
import { register_request } from '../../interface/auth.interface';

const Register = () => {
    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState('')
    const [showPassword, setShowPassword] = useRecoilState(showPasswordState('password'));
    const [errorAccountMessage, setErrorAccountMessage] = useState<any>('');
    const [registerAs, setRegisterAs] = useState<string>('');
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [showSnackbar, setShowSnackbar] = useState<snackbarType>({
        isOpen: false,
        message: '',
        status: 'success'
    });

    const [registerAccount, { isLoading }] = useRegisterMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<register_request>();
    const onSubmit: SubmitHandler<register_request> = async (data) => {
        if (!isChecked) {
            setShowSnackbar({
                isOpen: true,
                message: "Mohon menyetujui syarat dan ketentuan terlebih dahulu",
                status: 'error'
            })
        } else {
            try {
                await registerAccount(data).unwrap();
                window.location.href = `/register/dikirim/${data.email}`;
                reset();
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
                        <Card sx={{ width: '750px', boxShadow: 'none' }} className='flex items-center justify-center py-6'>
                            <CardContent className='w-[83%]'>
                                <div className='w-full text-center'>
                                    <img
                                        src="/images/logo.png"
                                        alt="Psikotest"
                                        loading="lazy"
                                    />
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className='mb-4'>
                                    <Typography align="center" className='text-[46px] font-semibold'>
                                        Daftar
                                    </Typography>
                                    <Typography align="center" className='text-base font-normal text-general-500'>
                                        Silahkan daftar terlebih dahulu
                                    </Typography>
                                    <Grid marginTop={'24px'}>
                                        <Typography>
                                            Daftar Sebagai <span className='text-danger-500'>*</span>
                                        </Typography>
                                        <RadioGroup
                                            row
                                            className='mt-2'
                                            onChange={(data) => setRegisterAs(data.target.value)}
                                        >
                                            <FormControlLabel value="pribadi" control={<Radio />} label="Pribadi" />
                                            <FormControlLabel value="perusahaan" control={<Radio />} label="Perusahaan" />
                                            <FormControlLabel value="instansi" control={<Radio />} label="Instansi Pendidikan" />
                                            <FormControlLabel value="referral" control={<Radio />} label="Referral" />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid marginTop={'24px'}>
                                        <Typography>
                                            Nama <span className='text-danger-500'>*</span>
                                        </Typography>
                                        <TextField
                                            className='mt-2 w-full'
                                            id="name"
                                            {...register("name", {
                                                required: true,
                                            })}
                                            autoFocus
                                            variant="outlined"
                                            placeholder='Masukkan Nama'
                                        />
                                    </Grid>
                                    <Grid marginTop={'24px'}>
                                        <Typography>
                                            Email <span className='text-danger-500'>*</span>
                                        </Typography>
                                        <TextField
                                            className='mt-2 w-full'
                                            autoFocus
                                            type="email"
                                            id="email"
                                            {...register("email", {
                                                required: true,
                                            })}
                                            variant="outlined"
                                            placeholder='Masukkan Email'
                                        />
                                    </Grid>
                                    <Grid marginTop={'24px'}>
                                        <Typography>
                                            No. HP <span className='text-danger-500'>*</span>
                                        </Typography>
                                        <TextField
                                            className='mt-2 w-full'
                                            autoFocus
                                            id="phone_number"
                                            {...register("phone_number", {
                                                required: true,
                                            })}
                                            value={phoneNumber}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, "");
                                                if (value != '') {
                                                    setPhoneNumber(value)
                                                } else {
                                                    setPhoneNumber('0')
                                                }
                                            }}
                                            variant="outlined"
                                            placeholder='Masukkan No. HP'
                                        />
                                    </Grid>
                                    <Grid marginTop={'24px'}>
                                        <Typography>
                                            Password <span className='text-danger-500'>*</span>
                                        </Typography>
                                        <TextField
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            variant="outlined"
                                            {...register("password", {
                                                required: true,
                                            })}
                                            placeholder='Masukkan Password'
                                            className='mt-2 w-full'
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
                                    </Grid>
                                    <Grid marginTop={'24px'}>
                                        <Typography>
                                            Kode Referral <span className='text-general-400'>( Opsional )</span>
                                        </Typography>
                                        <TextField
                                            className='mt-2 w-full'
                                            autoFocus
                                            id="phone_number"
                                            {...register("phone_number", {
                                                required: true,
                                            })}
                                            value={phoneNumber}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, "");
                                                if (value != '') {
                                                    setPhoneNumber(value)
                                                } else {
                                                    setPhoneNumber('0')
                                                }
                                            }}
                                            variant="outlined"
                                            placeholder='Masukkan No. HP'
                                        />
                                    </Grid>
                                    <Grid marginTop={'24px'}>
                                        <FormControlLabel control={<Checkbox defaultChecked={isChecked} onChange={() => setIsChecked(!isChecked)} />} label="Dengan mendaftar saya menyetujui Syarat & Ketentuan yang berlaku" />
                                    </Grid>
                                    <Grid marginTop={'24px'}>
                                        {!isLoading && (
                                            <Button type="submit" className='text-lg text-base-white bg-primary-500 hover:bg-primary-500 font-medium rounded-xl p-4 w-full shadow-none hover:shadow-none' variant="contained">
                                                Submit
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
                                    </Grid>
                                </form>
                                <Typography align="center" >Sudah Punya Akun? <span className='text-primary-500 cursor-pointer' onClick={() => navigate('/login')}>Masuk</span></Typography>
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

export default Register