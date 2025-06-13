/**
 * Example file showing how to use the new optimized components and hooks
 * This file demonstrates best practices for using the reusable components
 */

import React from 'react';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import Layout from '../components/Layout';
import PageHeader from '../components/molecules/PageHeader';
import TestCard from '../components/molecules/TestCard';
import SnackbarProvider, { useSnackbarContext } from '../components/organism/SnackbarProvider';
import { useSnackbar } from '../hooks/useSnackbar';
import { useNavigation } from '../hooks/useNavigation';
import { TestData } from '../types/test.types';

// Example 1: Using the optimized hooks
const ExampleWithHooks: React.FC = () => {
    const { showSuccess, showError } = useSnackbar();
    const { goBack, goToOrder } = useNavigation();

    const handleSuccess = () => {
        showSuccess('Operation completed successfully!');
    };

    const handleError = () => {
        showError('Something went wrong!');
    };

    return (
        <div>
            <button onClick={handleSuccess}>Show Success</button>
            <button onClick={handleError}>Show Error</button>
            <button onClick={goBack}>Go Back</button>
            <button onClick={goToOrder}>Go to Orders</button>
        </div>
    );
};

// Example 2: Using PageHeader component
const ExamplePageWithHeader: React.FC = () => {
    const handleCustomBack = () => {
        console.log('Custom back action');
    };

    return (
        <Layout>
            {/* Simple header with default back behavior */}
            <PageHeader title="Simple Page" />
            
            {/* Header with custom back action */}
            <PageHeader 
                title="Custom Back Page" 
                onBack={handleCustomBack}
            />
            
            {/* Header with specific back path */}
            <PageHeader 
                title="Specific Path Page" 
                backPath="/dashboard"
            />
            
            {/* Header with right content */}
            <PageHeader 
                title="Page with Actions" 
                rightContent={
                    <button className="bg-primary-500 text-white px-4 py-2 rounded">
                        Action Button
                    </button>
                }
            />
        </Layout>
    );
};

// Example 3: Using TestCard component
const ExampleTestCards: React.FC = () => {
    const sampleTest: TestData = {
        id: 'sample-001',
        category: 'Personality',
        method: 'Online',
        title: 'Sample Personality Test',
        price: 150000,
        description: [
            'This is a sample personality test description.',
            'It demonstrates how the TestCard component works.',
            'Multiple paragraphs are supported for detailed descriptions.'
        ]
    };

    const handleDownload = () => {
        console.log('Downloading sample report...');
        // Implement actual download logic
    };

    return (
        <Layout>
            <PageHeader title="Test Cards Example" />
            <Grid2 container rowSpacing={2} marginTop={3}>
                {/* Test card with custom download handler */}
                <TestCard test={sampleTest} onDownload={handleDownload} />
                
                {/* Test card with download URL */}
                <TestCard 
                    test={{
                        ...sampleTest,
                        id: 'sample-002',
                        title: 'Test with Download URL',
                        downloadUrl: 'https://example.com/sample-report.pdf'
                    }} 
                />
                
                {/* Test card without download option */}
                <TestCard 
                    test={{
                        ...sampleTest,
                        id: 'sample-003',
                        title: 'Test without Download'
                    }} 
                />
            </Grid2>
        </Layout>
    );
};

// Example 4: Using SnackbarProvider with context
const ExampleWithSnackbarContext: React.FC = () => {
    return (
        <SnackbarProvider>
            <ExampleContent />
        </SnackbarProvider>
    );
};

const ExampleContent: React.FC = () => {
    const { showSuccess, showError } = useSnackbarContext();

    return (
        <Layout>
            <PageHeader title="Snackbar Context Example" />
            <Grid2 container spacing={2} marginTop={3}>
                <Grid2>
                    <button 
                        onClick={() => showSuccess('Success from context!')}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Show Success
                    </button>
                    <button 
                        onClick={() => showError('Error from context!')}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Show Error
                    </button>
                </Grid2>
            </Grid2>
        </Layout>
    );
};

// Example 5: Complete optimized page structure
const CompleteOptimizedPage: React.FC = () => {
    const { showSuccess, showError } = useSnackbar();
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState<TestData | null>(null);

    React.useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setData({
                    id: 'complete-001',
                    category: 'Complete Example',
                    method: 'Hybrid',
                    title: 'Complete Optimized Test',
                    price: 250000,
                    description: ['This is a complete example of an optimized page.']
                });
                showSuccess('Data loaded successfully!');
            } catch (error) {
                showError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [showSuccess, showError]);

    if (loading) {
        return (
            <Layout>
                <PageHeader title="Loading..." />
                <Grid2 container marginTop={3}>
                    <Grid2 className="bg-white rounded-lg p-6" xs={12}>
                        <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </Grid2>
                </Grid2>
            </Layout>
        );
    }

    return (
        <Layout>
            <PageHeader title="Complete Example" backPath="/dashboard" />
            <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1 }} marginTop={3}>
                {data ? (
                    <TestCard 
                        test={data} 
                        onDownload={() => showSuccess('Download started!')} 
                    />
                ) : (
                    <Grid2 className="bg-white rounded-lg p-6" xs={12}>
                        <Typography>No data available</Typography>
                    </Grid2>
                )}
            </Grid2>
        </Layout>
    );
};

export {
    ExampleWithHooks,
    ExamplePageWithHeader,
    ExampleTestCards,
    ExampleWithSnackbarContext,
    CompleteOptimizedPage
};
