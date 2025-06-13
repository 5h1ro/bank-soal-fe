import { Alert, Box, Button, Chip, IconButton, Snackbar, Stack, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Dispatch, useState } from "react";
import { RiArrowLeftLine, RiUserLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import UseSwitchesCustom from "../../../components/atoms/Switch";
import { snackbarType } from "../../../interface/snackbar.interface";
import TabPanel from "../../../components/organism/TabPanel";
import CustomTabPanel from "../../../components/molecules/CustomTabPanel";
import DetailElement from "../../../components/atoms/DetailElement";

interface snackbarProps {
    showSnackBar: snackbarType
    setShowSnackbar: Dispatch<React.SetStateAction<snackbarType>>
}

function MitraDetail(props: snackbarProps) {
    const { showSnackBar, setShowSnackbar } = props;
    const [showSnackbarLocal, setShowSnackbarLocal] = useState<snackbarType>({
        isOpen: false,
        message: '',
        status: 'success'
    });
    const navigate = useNavigate();

    const [tab, setTab] = useState(0)
    const labels = ['Info Mitra']
    const icons = [<RiUserLine size={'16px'} />]

    const detailBerkas = [
        {
            label: 'Nama Perusahaan Sesuai SK Kemenkumham',
            value: <Typography>PT Psikologi Indonesia</Typography>
        },
        {
            label: 'Alamat',
            value: <Typography>Bandung, Jawa Barat</Typography>
        },
        {
            label: 'NPWP',
            value: <Typography>1234567890</Typography>
        },
        {
            label: 'Scan SK Kemenkumham',
            value: <Typography className="text-primary-500 cursor-pointer">filename.pdf</Typography>
        },
        {
            label: 'Scan NIB',
            value: <Typography className="text-primary-500 cursor-pointer">filename.pdf</Typography>
        },
        {
            label: 'Scan NPWP',
            value: <Typography className="text-primary-500 cursor-pointer">filename.pdf</Typography>
        },
    ]
    const detailInfo = [
        {
            label: 'Nama Admin',
            value: <Typography>John Doe</Typography>
        },
        {
            label: 'Jenis',
            value: <Typography>Perusahaan</Typography>
        },
        {
            label: 'Status',
            value: <Chip label='Pending' className={`bg-secondary-50 text-secondary-500 rounded-md`} />
        },
        {
            label: 'Nama Perusahaan',
            value: <Typography>PT Psikologi Indonesia</Typography>
        },
        {
            label: 'Email',
            value: <Typography>email@example.com</Typography>
        },
        {
            label: 'No. HP',
            value: <Typography>081234567890</Typography>
        },
        {
            label: 'Kode Referral',
            value: <Typography>JOHNDOE99</Typography>
        },
    ]
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
                    Detail Mitra
                </Typography>
            </Grid2>
            <TabPanel icons={icons} labels={labels} value={tab} setValue={setTab}>
                <CustomTabPanel value={tab} index={0}>
                    <Typography className="text-xl font-semibold">
                        Info Mitra
                    </Typography>
                    <Grid2 className="bg-base-white rounded-lg" xs={12}>
                        <Stack spacing={3} className='mt-6'>
                            {
                                detailInfo.map(({ label, value }) => <DetailElement label={label} value={value} />)
                            }
                        </Stack>
                    </Grid2>
                    <Typography className="text-xl font-semibold mt-8">
                        Validasi Berkas
                    </Typography>
                    <Grid2 className="bg-base-white rounded-lg" xs={12}>
                        <Stack spacing={3} className='mt-6'>
                            {
                                detailBerkas.map(({ label, value }) => <DetailElement label={label} value={value} />)
                            }
                        </Stack>
                    </Grid2>
                    <Grid2 container className='flex gap-2 mt-6 pb-8 md:pb-16'>
                        <Button className='bg-success-500 text-base-white hover:bg-success-500 hover:text-base-white py-4 px-6 rounded-xl' onClick={() => {
                            setShowSnackbar({
                                isOpen: true,
                                message: "Berhasil menghapus data",
                                status: 'success'
                            })
                        }}>
                            Approve
                        </Button>
                        <Button className='bg-danger-500 text-base-white hover:bg-danger-500 hover:text-base-white py-4 px-6 rounded-xl'>
                            Reject
                        </Button>
                    </Grid2>
                </CustomTabPanel>
            </TabPanel>
        </Layout >
    )
}

export default MitraDetail 