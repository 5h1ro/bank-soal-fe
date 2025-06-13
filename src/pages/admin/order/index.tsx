import { Box, Typography } from "@mui/material"
import { useRef, useState } from "react"
import Grid2 from "@mui/material/Unstable_Grid2"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { usePrevNextButtons } from "../../../components/atoms/EmblaCarouselArrowButtons"
import OrderCategoryElement from "../../../components/atoms/OrderCategoryElement"
import OrderCardElement from "../../../components/atoms/OrderCardElement"

// Optimized imports
import { useNavigation } from "../../../hooks/useNavigation"
import Layout from "../../../components/Layout"

interface OrderData {
    name: string;
    detail: string;
    price: number;
    category?: string;
}

interface CategoryData {
    id: number;
    name: string;
}

const OrderOptimized: React.FC = () => {

    const { goToDetail } = useNavigation();
    const services = useRef<HTMLElement | null>(null);
    const [category, setCategory] = useState(1000);
    const [orderData] = useState<OrderData[]>([
        { name: 'Staff Package', detail: 'IST, DISC, MBTI, Kraeplin', price: 300000, category: 'staff' },
        { name: 'Inteligensi/ Kognitif', detail: 'Intelligenz Struktur Test (IST)', price: 300000, category: 'kognitif' },
        { name: 'Kepribadian', detail: 'DISC, MBTI Assessment', price: 250000, category: 'kepribadian' },
        { name: 'Mini Stress', detail: 'Stress Level Assessment', price: 150000, category: 'stress' },
        { name: 'Berpikir Kritis', detail: 'Critical Thinking Test', price: 200000, category: 'kritis' },
        { name: 'Lain-lain', detail: 'Custom Assessment Package', price: 350000, category: 'lainnya' }
    ]);

    const dataCategory: CategoryData[] = [
        { id: 1, name: 'Inteligensi/ Kognitif' },
        { id: 2, name: 'Kepribadian' },
        { id: 3, name: 'Mini Stress' },
        { id: 4, name: 'Kemampuan Berpikir Kritis' },
        { id: 5, name: 'Lain-lain' },
    ];
    const [emblaRefCategory, emblaApiCategory] = useEmblaCarousel(
        { slidesToScroll: 'auto', loop: true },
        [Autoplay({ playOnInit: true, delay: 3000 })]
    );

    const {
        prevBtnDisabled,
        nextBtnDisabled
    } = usePrevNextButtons(emblaApiCategory);




    const handleOrderClick = (order: OrderData) => {
        goToDetail('order/tes', order.name);
    };

    const filteredOrders = orderData?.filter(order =>
        category === 1000 || order.category === getCategoryKey(category)
    ) || [];

    const getCategoryKey = (categoryId: number): string => {
        const categoryMap: Record<number, string> = {
            1: 'kognitif',
            2: 'kepribadian',
            3: 'stress',
            4: 'kritis',
            5: 'lainnya'
        };
        return categoryMap[categoryId] || '';
    };



    return (
        <Layout>
            <Box sx={{
                "& .MuiBox-root": {
                    boxShadow: "0",
                },
                "& .MuiPaper-root": {
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    paddingTop: '14px',
                },
                bgcolor: 'white',
                borderRadius: '8px',
                marginTop: 3
            }}>
                <section ref={services} className="w-full relative pt-4 pb-8 px-8">
                    <div className="embla__viewport w-full mx-auto" ref={emblaRefCategory}>
                        <div className={`embla__container flex w-full ${prevBtnDisabled && nextBtnDisabled ? 'w-full mx-auto justify-center' : 'justify-start'} gap-4 py-2`}>
                            <div className="flex-shrink-0 cursor-pointer ml-2" onClick={() => setCategory(1000)}>
                                <OrderCategoryElement isIndex={category === 1000} name='Semua' />
                            </div>
                            {dataCategory?.map((d) => (
                                <div
                                    key={`category-${d.id}`}
                                    className="flex-shrink-0 cursor-pointer mr-2"
                                    onClick={() => setCategory(d.id)}
                                >
                                    <OrderCategoryElement isIndex={category === d.id} name={d.name} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <Typography fontWeight={600} fontSize={20} marginTop={'24px'}>
                        Kategori : {category === 1000 ? 'Semua Tes' : dataCategory?.find(c => c.id === category)?.name || 'Semua Tes'}
                    </Typography>
                    <Grid2 marginTop={2}>
                        <Grid2 container rowGap={4} justifyContent={'space-between'}>
                            {filteredOrders?.map((order: OrderData, i: number) => (
                                <div key={`order-${order.name}-${i}`}>
                                    <OrderCardElement
                                        detail={order.detail}
                                        name={order.name}
                                        price={order.price}
                                    />
                                </div>
                            ))}
                        </Grid2>
                    </Grid2>
                </section>
            </Box>
        </Layout>
    );
};

// Export optimized component
export default OrderOptimized;