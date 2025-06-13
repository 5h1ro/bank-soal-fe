import { IconButton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { RiArrowLeftLine } from "@remixicon/react";
import { PageHeaderProps } from "../../types/test.types";
import { useNavigation } from "../../hooks/useNavigation";

const PageHeader: React.FC<PageHeaderProps> = ({ 
    title, 
    onBack, 
    backPath, 
    rightContent 
}) => {
    const { goBack, goTo } = useNavigation();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else if (backPath) {
            goTo(backPath);
        } else {
            goBack();
        }
    };

    return (
        <Grid2 container alignContent="center" className="w-full justify-between">
            <Grid2 container>
                <IconButton onClick={handleBack}>
                    <RiArrowLeftLine className="w-8 h-8" color="#000000" />
                </IconButton>
                <Typography className="text-4xl font-semibold self-center">
                    {title}
                </Typography>
            </Grid2>
            {rightContent && (
                <Grid2>
                    {rightContent}
                </Grid2>
            )}
        </Grid2>
    );
};

export default PageHeader;
