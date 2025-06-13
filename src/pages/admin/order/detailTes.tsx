import Grid2 from "@mui/material/Unstable_Grid2";
import { useParams } from "react-router-dom";
import PageHeader from "../../../components/molecules/PageHeader";
import TestCard from "../../../components/molecules/TestCard";
import { CFIT_TEST_DATA, getTestById } from "../../../constants/testData";
import EnhancedLayout from "../../../components/EnhancedLayout";

function OrderDetailTes() {
    const { id } = useParams<{ id: string }>();

    // Direct data initialization for slicing - no loading state
    const testData = id ? getTestById(id) || CFIT_TEST_DATA : CFIT_TEST_DATA;

    const handleDownload = () => {
        // Implement download logic here
        console.log('Downloading sample report...');
    };


    return (
        <EnhancedLayout>
            <PageHeader title="Detail Tes" backPath="/order" />
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                <TestCard test={testData} onDownload={handleDownload} />
            </Grid2>
        </EnhancedLayout>
    );
}

export default OrderDetailTes 