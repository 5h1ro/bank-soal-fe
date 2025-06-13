import Grid2 from "@mui/material/Unstable_Grid2";
import { useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import PageHeader from "../../../components/molecules/PageHeader";
import TestCard from "../../../components/molecules/TestCard";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { CFIT_TEST_DATA, getTestById } from "../../../constants/testData";
import { useEffect, useState } from "react";
import { TestData } from "../../../types/test.types";
import SnackbarProvider, { useSnackbarContext } from "../../../components/organism/SnackbarProvider";

const OrderDetailTestContent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [testData, setTestData] = useState<TestData | null>(null);
    const [loading, setLoading] = useState(true);
    const { showError } = useSnackbarContext();

    useEffect(() => {
        const loadTestData = async () => {
            try {
                setLoading(true);
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // For now, use hardcoded data. In the future, this would be an API call
                const data = id ? getTestById(id) : CFIT_TEST_DATA;
                
                if (!data) {
                    showError('Test data not found');
                    return;
                }
                
                setTestData(data);
            } catch (error) {
                showError('Failed to load test data');
                console.error('Error loading test data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTestData();
    }, [id, showError]);

    const handleDownload = () => {
        // Implement download logic here
        console.log('Downloading sample report...');
        // You could show a success message or handle the download
    };

    if (loading) {
        return (
            <Layout>
                <PageHeader title="Detail Tes" backPath="/order" />
                <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                    <Grid2 className="bg-base-white rounded-lg p-6" xs={12}>
                        <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/6 mb-4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </Grid2>
                </Grid2>
            </Layout>
        );
    }

    if (!testData) {
        return (
            <Layout>
                <PageHeader title="Detail Tes" backPath="/order" />
                <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                    <Grid2 className="bg-base-white rounded-lg p-6" xs={12}>
                        <div className="text-center py-8">
                            <p className="text-gray-500">Test data not found</p>
                        </div>
                    </Grid2>
                </Grid2>
            </Layout>
        );
    }

    return (
        <Layout>
            <PageHeader title="Detail Tes" backPath="/order" />
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                <TestCard test={testData} onDownload={handleDownload} />
            </Grid2>
        </Layout>
    );
};

const OrderDetailTest: React.FC = () => {
    return (
        <SnackbarProvider>
            <OrderDetailTestContent />
        </SnackbarProvider>
    );
};

export default OrderDetailTest;
