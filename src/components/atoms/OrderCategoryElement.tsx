import { Typography } from "@mui/material";

interface OrderCategoryElementProps {
    isIndex: boolean;
    name: string;
}
export default function OrderCategoryElement(props: OrderCategoryElementProps) {
    const { isIndex, name } = props;
    return <div className={`${isIndex ? 'bg-primary-500 outline outline-2 outline-primary-500' : 'outline outline-2 outline-general-500 bg-[transparent]'} inline-block px-4 py-2 rounded-lg`}>
        <Typography className={`font-medium text-lg md:font-medium md:text-lg ${isIndex ? 'text-base-white' : 'text-general-500'}`}>
            {name}
        </Typography>
    </div>
}