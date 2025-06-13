import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useAuth } from "../../hooks/auth.hook";
import { RemixiconComponentType, RiBankCardLine, RiBarChartFill, RiCoinLine, RiEdit2Line, RiEditBoxLine, RiEditLine, RiErrorWarningLine, RiGlobalLine, RiWalletLine } from "@remixicon/react";

interface Card1Props {
    name: string;
    total: number | string;
    hidden: boolean;
    index: number;
    image: string;
    onCLick: () => void
}
function Card1(props: Card1Props) {
    const auth = useAuth();
    const { name, total, hidden, index, image, onCLick } = props;
    const Item = styled(Paper)(() => ({
        boxShadow: 'none',
        height: '179px',
        padding: '1.5rem',
    }));
    const className = 'text-[#01B3C1] mx-auto my-auto w-full h-full'
    return (
        <Grid2 xs={12} md={auth.user_payload.role === 'participant' ? 6 : 3} hidden={hidden}>
            <Item>
                <Grid2 className="h-[60px] w-[60px] bg-[#EBFFFD] rounded-full flex">
                    {
                        image === 'edit' ? <RiEditBoxLine className={className} /> : image === 'card-line' ? <RiBankCardLine className={className} /> : image === 'warning' ? <RiErrorWarningLine className={className} /> : image === 'graph' ? <RiBarChartFill className={className} /> : <RiGlobalLine className={className} />
                    }
                </Grid2>
                <Typography fontSize={16} fontWeight={400} className="text-general-500" marginTop={'0.5rem'}>
                    {name}
                </Typography>
                <Grid2 container justifyContent={'space-between'} alignItems={'center'}>
                    <Typography fontWeight={600} fontSize={24} className="text-base-dark">
                        {total}
                    </Typography>
                    <Grid2 className="bg-primary-500 text-base-white font-medium py-2 px-4 rounded-md cursor-pointer" onClick={onCLick}>
                        {image == 'card-line' ? 'Top Up' : 'Detail'}
                    </Grid2>
                </Grid2>
            </Item>
        </Grid2>
    )
}
export default Card1