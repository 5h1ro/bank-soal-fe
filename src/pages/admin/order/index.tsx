import { Alert, Box, Button, Snackbar, Typography } from "@mui/material"
import { Dispatch, SyntheticEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../../../components/Layout"
import { snackbarType } from "../../../interface/snackbar.interface"
import Grid2 from "@mui/material/Unstable_Grid2"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { usePrevNextButtons } from "../../../components/atoms/EmblaCarouselArrowButtons"
import { RiArrowLeftLine, RiArrowRightLine, RiShoppingCart2Line } from "@remixicon/react"
import OrderCategoryElement from "../../../components/atoms/OrderCategoryElement"
import OrderCardElement from "../../../components/atoms/OrderCardElement"

interface snackbarProps {
    showSnackBar: snackbarType
    setShowSnackbar: Dispatch<React.SetStateAction<snackbarType>>
}

function Order(props: snackbarProps) {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const { showSnackBar, setShowSnackbar } = props;
    const services = useRef<HTMLElement | null>(null);

    const [category, setCategory] = useState(1000)
    const dataCategory = [
        {
            id: 1,
            name: 'Inteligensi/ Kognitif'
        },
        {
            id: 2,
            name: 'Kepribadian'
        },
        {
            id: 3,
            name: 'Mini Stress'
        },
        {
            id: 4,
            name: 'Kemampuan Berpikir Kritis'
        },
        {
            id: 5,
            name: 'Lain-lain'
        },
    ]
    const [isPlaying, setIsPlaying] = useState(true)
    const [emblaRefCategory, emblaApiCategory] = useEmblaCarousel({ slidesToScroll: 'auto', loop: true }, [Autoplay({ playOnInit: true, delay: 3000 })])
    useEffect(() => {
        const autoplay = emblaApiCategory?.plugins()?.autoplay
        if (!autoplay) return

        setIsPlaying(autoplay.isPlaying())
        emblaApiCategory
            .on('autoplay:play', () => setIsPlaying(true))
            .on('autoplay:stop', () => setIsPlaying(false))
            .on('reInit', () => setIsPlaying(autoplay.isPlaying()))
    }, [emblaApiCategory])
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApiCategory)

    const dataOrder = [
        {
            name: 'staff',
            detail: 'IST, DISC, MBTI, Kraeplin',
            price: 300000
        },
        {
            name: 'Inteligensi/ Kognitif',
            detail: 'Intelligenz Struktur Test (IST)',
            price: 300000
        },
        {
            name: 'staff',
            detail: 'IST, DISC, MBTI, Kraeplin',
            price: 300000
        },
        {
            name: 'Inteligensi/ Kognitif',
            detail: 'Intelligenz Struktur Test (IST)',
            price: 300000
        },
        {
            name: 'staff',
            detail: 'IST, DISC, MBTI, Kraeplin',
            price: 300000
        },
        {
            name: 'Inteligensi/ Kognitif',
            detail: 'Intelligenz Struktur Test (IST)',
            price: 300000
        }
    ]
    const handleCloseSnackbar = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowSnackbar({
            isOpen: false,
            message: showSnackBar.message,
            status: 'success'
        })
    };
    return (
        <Layout>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={showSnackBar.isOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    className={(showSnackBar.status === 'success' ? 'bg-success-500' : 'bg-danger-500') + ' w-[85vw] md:w-[496px]'}
                    variant="filled"
                >
                    {showSnackBar.message}
                </Alert>
            </Snackbar>
            <Grid2 container className="block" marginTop={4}>
                <Box sx={{
                    "& .MuiBox-root": {
                        boxShadow: "0",
                    },
                    "& .MuiPaper-root": {
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        paddingTop: '14px',
                    },
                    bgcolor: 'white'
                }}>
                    <section ref={services} className="w-full md:w-[95%] relative pt-4 pb-8 px-8">
                        <div className="embla__viewport w-[70vw] md:w-[95%] mx-auto" ref={emblaRefCategory}>
                            <div className={`embla__container flex w-full ${prevBtnDisabled && nextBtnDisabled ? 'w-full mx-auto justify-center' : 'md:w-[95%] justify-start'} gap-4 py-2`}>
                                {
                                    dataCategory?.map((d, i) => {
                                        if (i == 0) {
                                            ''
                                            return (<>
                                                <div key={1000} className="flex-shrink-0 cursor-pointer ml-2" onClick={async () => {
                                                    setCategory(1000)
                                                }}>
                                                    <OrderCategoryElement isIndex={category == 1000} name='Semua' key={`${category}-1000`}></OrderCategoryElement>
                                                </div>
                                                <div key={i} className="flex-shrink-0 cursor-pointer" onClick={async () => {
                                                    setCategory(i)
                                                }}>
                                                    <OrderCategoryElement isIndex={category == i} name={d.name} key={`${category}-${i}`}></OrderCategoryElement>
                                                </div>
                                            </>)
                                        } else {
                                            return <div key={i} className="flex-shrink-0 cursor-pointer mr-2" onClick={async () => {
                                                setCategory(i)
                                            }}>
                                                <OrderCategoryElement isIndex={category == i} name={d.name} key={`${category}-${i}`}></OrderCategoryElement>
                                            </div>
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <Typography fontWeight={600} fontSize={20} marginTop={'24px'}>Kategori : Semua Tes</Typography>
                        <Grid2 marginTop={2}>
                            <Grid2 container rowGap={4} justifyContent={'space-between'}>
                                {
                                    dataOrder?.map((d, i) => {
                                        return <OrderCardElement detail={d.detail} name={d.name} price={d.price} key={`order-${i}`}></OrderCardElement>
                                    })
                                }
                            </Grid2>
                        </Grid2>
                    </section>
                </Box>
            </Grid2>
        </Layout>
    )
}

export default Order 