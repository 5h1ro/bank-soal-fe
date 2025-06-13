import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { useAuth } from "../../hooks/auth.hook";
import { Moment } from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Card1 from "../../components/molecules/Card1";

function Dashboard() {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState<Moment | null>(null);
    const [endDate, setEndDate] = useState<Moment | null>(null);
    const [dataDashboard, setDataDashboard] = useState<any>();
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<any>(1000);
    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
        }
        const handleResize = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const data = [
        {
            name: 'Total Test Diikuti',
            total: 80,
            image: 'edit',
            hidden: false,
            onClick: () => navigate('/riwayat-tes')
        },
        {
            name: 'Total Pelanggaran',
            total: 1000,
            image: 'warning',
            hidden: false,
            onClick: () => navigate('/riwayat-pelanggaran')
        },
        {
            name: 'Saldo Saya',
            total: (100000000).toLocaleString?.('id', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            image: 'card-line',
            hidden: false,
            onClick: () => navigate('/deposit')
        },
        {
            name: 'Total Pembelian',
            total: (100000000).toLocaleString?.('id', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            image: 'graph',
            hidden: false,
            onClick: () => navigate('/transaksi-user')
        },
    ];
    let card1 = data.map(function (data, index) {
        return <Card1 image={data.image} name={data.name} total={data.total} index={index} key={data.name} hidden={data.hidden} onCLick={data.onClick}></Card1>;
    });
    return (
        <Layout>
            <Typography className="text-4xl font-semibold text-base-dark mb-6">
                Dashboard
            </Typography>
            <Grid2 className="md:w-1/3">
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Box display="flex" alignItems="center">
                        <DatePicker
                            className="bg-base-white"
                            label="Awal"
                            value={startDate}
                            onChange={(newDate) => {
                                setStartDate(newDate!)

                            }}
                            slotProps={{ textField: { fullWidth: true } }} // Use slotProps for the input field
                        />
                        <Box sx={{ mx: 2 }}> - </Box>
                        <DatePicker
                            className="bg-base-white"
                            label="Akhir"
                            value={endDate}
                            onChange={(newDate) => setEndDate(newDate!)}
                            slotProps={{ textField: { fullWidth: true } }} // Use slotProps for the input field
                        />
                    </Box>
                </LocalizationProvider>
            </Grid2>
            <Grid2 container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} marginTop={'1rem'}>
                {card1}
            </Grid2>
        </Layout >
    )
}

export default Dashboard 