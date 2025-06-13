import { Alert, Button, IconButton, Snackbar, Stack, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Dispatch, useState } from "react";
import { RiArrowLeftLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import UseSwitchesCustom from "../../../components/atoms/Switch";
import { snackbarType } from "../../../interface/snackbar.interface";

interface snackbarProps {
    showSnackBar: snackbarType
    setShowSnackbar: Dispatch<React.SetStateAction<snackbarType>>
}

function MitraUpdate(props: snackbarProps) {
    const { showSnackBar, setShowSnackbar } = props;
    const [showSnackbarLocal, setShowSnackbarLocal] = useState<snackbarType>({
        isOpen: false,
        message: '',
        status: 'success'
    });
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isActive, setIsActive] = useState<boolean>(true)
    const [phoneNumber, setPhoneNumber] = useState('')

    const onUpdate = async () => {
        try {
            setShowSnackbar({
                isOpen: true,
                message: 'Berhasil mengubah data',
                status: 'success'
            })
            navigate('/mitra')
        } catch (error: any) {
            setShowSnackbarLocal({
                isOpen: true,
                message: 'Server error',
                status: 'error'
            })
        }
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
                <IconButton onClick={() => navigate('/mitra')}>
                    <RiArrowLeftLine className="w-8 h-8" color="#000000" />
                </IconButton>
                <Typography className="w-10/12 text-4xl font-semibold pt-1">
                    Ubah Mitra
                </Typography>
            </Grid2>
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                <Grid2 className="bg-base-white rounded-lg" xs={12}>
                    <Stack spacing={3} padding={2}>
                        <Grid2 container>
                            <Typography className="w-full">Nama Mitra <span className='text-danger-500'>*</span></Typography>
                            <TextField value={name} onChange={(data) => setName(data.target.value)} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Nama Mitra'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="w-full">Email <span className='text-danger-500'>*</span></Typography>
                            <TextField value={email} onChange={(data) => setEmail(data.target.value)} variant="outlined" className='mt-2 w-full' placeholder='Masukkan Email'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <Typography className="w-full">No. HP <span className='text-danger-500'>*</span></Typography>
                            <TextField value={phoneNumber} onChange={(data) => setPhoneNumber(data.target.value)} variant="outlined" className='mt-2 w-full' placeholder='Masukkan No. HP'
                                InputProps={{
                                    style: {
                                        borderRadius: "10px",
                                    }
                                }} />
                        </Grid2>
                        <Grid2 container>
                            <UseSwitchesCustom isActive={isActive} setIsActive={setIsActive} />
                            <Typography className="self-center ml-2">Active?</Typography>
                        </Grid2>
                        <Button onClick={onUpdate} className='w-24 px-6 py-4 rounded-xl bg-primary-500 text-base-white hover:bg-primary-500 hover:text-base-white' >
                            Ubah
                        </Button>
                    </Stack>
                </Grid2>
            </Grid2>
        </Layout >
    )
}

export default MitraUpdate 