import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { RiShoppingCart2Line } from "@remixicon/react";
import Currency from "./Currency";
import { useNavigate } from "react-router-dom";

interface OrderCardElementProps {
    name: string;
    detail: string;
    price: number;
}
export default function OrderCardElement(props: OrderCardElementProps) {
    const navigate = useNavigate();
    const { name, detail, price } = props;
    return <Grid2 xs={12} lg={5.8} className="flex outline outline-2 outline-general-200 rounded-lg p-6 justify-between">
        <Grid2>
            <Typography className="text-general-500">{name}</Typography>
            <Typography className="font-medium mt-2">{detail}</Typography>
            <Typography className="font-semibold mt-2">{
                Currency({ value: price })
            }</Typography>
            <Typography className="text-primary-500 mt-2 cursor-pointer" onClick={() => navigate('/order/tes/1')}>Lihat Detail</Typography>
        </Grid2>
        <Grid2 container className="items-center">
            <Grid2 className="bg-primary-500 w-10 h-10 justify-center flex text-center items-center rounded-md cursor-pointer" onClick={() => {
                navigate('/order/1')
            }}>
                <RiShoppingCart2Line color="white"></RiShoppingCart2Line>
            </Grid2>
        </Grid2>
    </Grid2>
}