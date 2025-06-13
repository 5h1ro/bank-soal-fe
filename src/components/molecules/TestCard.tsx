import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { TestCardProps } from "../../types/test.types";
import Currency from "../atoms/Currency";

const TestCard: React.FC<TestCardProps> = ({ test, onDownload }) => {
    const handleDownload = () => {
        if (onDownload) {
            onDownload();
        } else if (test.downloadUrl) {
            window.open(test.downloadUrl, '_blank');
        }
    };

    return (
        <Grid2 className="bg-base-white rounded-lg p-6" xs={12}>
            <Grid2 container justifyContent="space-between">
                <Typography className="text-general-400">{test.category}</Typography>
                <Typography className="text-general-400">Metode: {test.method}</Typography>
            </Grid2>
            
            <Typography className="text-xl font-semibold mt-2">
                {test.title}
            </Typography>
            
            <Typography className="font-semibold mt-2 text-primary-500">
                <Currency value={test.price} />
            </Typography>
            
            <div className="mt-4">
                {test.description.map((paragraph, index) => (
                    <Typography key={index} className="mt-4 leading-7 first:mt-0">
                        {paragraph}
                    </Typography>
                ))}
            </div>
            
            {(onDownload || test.downloadUrl) && (
                <Grid2 
                    className="bg-primary-500 text-center w-fit mt-4 align-center flex items-center rounded-lg py-4 px-6 cursor-pointer hover:bg-primary-600 transition-colors"
                    onClick={handleDownload}
                >
                    <Typography className="text-base-white">
                        Download Contoh Laporan
                    </Typography>
                </Grid2>
            )}
        </Grid2>
    );
};

export default TestCard;
