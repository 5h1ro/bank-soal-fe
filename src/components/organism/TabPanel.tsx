import { Box, Tab, Tabs } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { SyntheticEvent } from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index?: number;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    labels: string[];
    icons: JSX.Element[];
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, setValue, labels, icons } = props;
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Grid2 container marginTop={4}>
            <Box sx={{
                bgcolor: 'white',
                width: '100%',
            }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{
                        padding: '16px 24px 0px 24px',
                    }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'InactiveBorder' }}>
                            <Tabs value={value}
                                variant="scrollable"
                                allowScrollButtonsMobile
                                onChange={handleChange}
                                sx={{
                                    '.MuiTabs-indicator': {
                                        backgroundColor: 'transparent'
                                    },
                                    '.MuiTabScrollButton-root': {
                                        width: '24px',
                                    },
                                    '.MuiTabs-scrollButtons.Mui-disabled': {
                                        opacity: '0.3'
                                    }

                                }}>
                                {
                                    labels.map((label, index) => <Tab key={index} label={label} {...a11yProps(0)} sx={{
                                        minHeight: '0px',
                                        marginTop: '8px'
                                    }} icon={icons[index]} iconPosition='start' />)
                                }
                            </Tabs>
                        </Box>
                    </Box>
                    {children}
                </Box>
            </Box>
        </Grid2>
    )
}
export default TabPanel