import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Grid2 className='w-[100vw] h-[100vh] bg-primary-500'>
            <div className="w-full h-full bg-center bg-no-repeat bg-cover flex" style={{
                backgroundImage: "url('/images/error-pattern.png')"
            }}>
                <Grid2 className='bg-base-white mx-4 md:mx-auto md:w-[750px] md:h-[750px] rounded-md my-auto py-16 px-8 md:p-16 justify-center'>
                    <Grid2 container>
                        <img src="/images/page-not-found.png" className='mx-auto w-[250px] h-[250px] md:w-[350px] md:h-[350px]' />
                    </Grid2>
                    <Typography fontWeight={600} className='text-2xl md:text-4xl' align='center'>
                        Error 404
                        <br />
                        Halaman Tidak Ditemukan
                    </Typography>
                    <Typography align='center' className='mt-4'>Wah sepertinya halaman ini tidak ditemukan. </Typography>
                    <Grid2 xs display="flex" justifyContent="center" alignItems="center" className='mt-4'>
                        <Button size="large" onClick={() => navigate('/')} variant="contained" className='text-base-white rounded-lg shadow-none p-4'>
                            Kembali ke Homepage
                        </Button>
                    </Grid2>
                </Grid2>
            </div>
        </Grid2>
    )
}

export default NotFoundPage