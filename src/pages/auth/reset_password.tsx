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
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { useResetPasswordMutation } from '../../api/auth.api';
import { showConfirmationPasswordState, showPasswordState } from '../../utils/recoil-state.util';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { userID, token } = useParams();
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [showPassword, setShowPassword] = useRecoilState(showPasswordState('password'));
    const [showConfirmationPassword, setShowConfirmationPassword] = useRecoilState(showConfirmationPasswordState('password'));
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const onSubmit = async () => {
        const data = {
            user_id: userID,
            token,
            password,
            password_confirmation: passwordConfirmation
        }
        await resetPassword(data).unwrap();
        navigate('/login');
    };
    return (
        <>
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
                                    Reset Password
                                </Typography>
                                <Typography align="center" className='text-base font-normal text-general-500'>
                                    Silahkan perbarui passwordmu
                                </Typography>
                                <Grid marginTop={'24px'}>
                                    <Typography>
                                        Password Baru <span className='text-danger-500'>*</span>
                                    </Typography>
                                    <TextField
                                        value={password}
                                        onChange={(data) => setPassword(data.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        variant="outlined"
                                        placeholder='Masukkan Password Baru'
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
                                        Konfirmasi Password Baru <span className='text-danger-500'>*</span>
                                    </Typography>
                                    <TextField
                                        value={passwordConfirmation}
                                        onChange={(data) => setPasswordConfirmation(data.target.value)}
                                        type={showConfirmationPassword ? "text" : "password"}
                                        id="password"
                                        variant="outlined"
                                        placeholder='Masukkan Konfirmasi Password Baru'
                                        className='mt-2 w-full'
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => {
                                                            setShowConfirmationPassword(!showConfirmationPassword);
                                                        }}
                                                    >
                                                        {showConfirmationPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid marginTop={'24px'}>
                                    {!isLoading && (
                                        <Button type="submit" onClick={onSubmit} className='text-lg text-base-white bg-primary-500 hover:bg-primary-500 font-medium rounded-xl p-4 w-full shadow-none hover:shadow-none' variant="contained">
                                            Ubah Password
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

export default ResetPassword