import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

interface DetailElementProps {
    label: string;
    value: JSX.Element;
}
export default function DetailElement(props: DetailElementProps) {
    const { label, value } = props;
    return <Grid2 container>
        <Typography width={'250px'}>{label}</Typography>
        <Box className='w-full md:w-auto'>
            {value}
        </Box>
    </Grid2>
}