import React from 'react';
import { Typography, Card, CardContent, Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { 
    RiUserLine, 
    RiMoneyDollarCircleLine, 
    RiFileTextLine, 
    RiTrendingUpLine,
    RiArrowRightLine
} from '@remixicon/react';

// Optimized imports
import { withPageEnhancements, usePageUtils } from '../../hoc/withPageEnhancements';
import { usePageData } from '../../hooks/usePageData';
import { ROUTES, PAGE_TITLES } from '../../constants/routes';
import Currency from '../../components/atoms/Currency';

interface DashboardStats {
    totalUsers: number;
    totalRevenue: number;
    totalTests: number;
    totalOrders: number;
    recentTransactions: Array<{
        id: number;
        user: string;
        amount: number;
        date: string;
    }>;
    recentOrders: Array<{
        id: number;
        user: string;
        test: string;
        status: string;
        date: string;
    }>;
}

/**
 * Optimized Dashboard component using new architecture
 */
const DashboardOptimized: React.FC = () => {
    const { goTo, showSuccess } = usePageUtils();

    // Use global data management
    const { data: dashboardData, loading, error } = usePageData<DashboardStats>(
        async () => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            return {
                totalUsers: 1250,
                totalRevenue: 45750000,
                totalTests: 89,
                totalOrders: 342,
                recentTransactions: [
                    { id: 1, user: 'John Doe', amount: 300000, date: '2023-08-17' },
                    { id: 2, user: 'Jane Smith', amount: 250000, date: '2023-08-17' },
                    { id: 3, user: 'Bob Johnson', amount: 150000, date: '2023-08-16' },
                ],
                recentOrders: [
                    { id: 1, user: 'Alice Brown', test: 'CFIT', status: 'completed', date: '2023-08-17' },
                    { id: 2, user: 'Charlie Wilson', test: 'DISC', status: 'pending', date: '2023-08-17' },
                    { id: 3, user: 'Diana Davis', test: 'MBTI', status: 'processing', date: '2023-08-16' },
                ]
            };
        },
        { fetchOnMount: true }
    );

    const StatCard: React.FC<{
        title: string;
        value: string | number;
        icon: React.ReactNode;
        color: string;
        onClick?: () => void;
    }> = ({ title, value, icon, color, onClick }) => (
        <Card 
            className={`cursor-pointer hover:shadow-lg transition-shadow ${onClick ? 'hover:bg-gray-50' : ''}`}
            onClick={onClick}
        >
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Typography variant="body2" color="textSecondary" className="mb-2">
                            {title}
                        </Typography>
                        <Typography variant="h4" className="font-bold">
                            {value}
                        </Typography>
                    </div>
                    <div className={`p-3 rounded-full ${color}`}>
                        {icon}
                    </div>
                </div>
                {onClick && (
                    <div className="flex items-center mt-4 text-primary-500">
                        <Typography variant="body2" className="mr-1">
                            Lihat Detail
                        </Typography>
                        <RiArrowRightLine className="w-4 h-4" />
                    </div>
                )}
            </CardContent>
        </Card>
    );

    const RecentTransactionItem: React.FC<{
        transaction: DashboardStats['recentTransactions'][0];
    }> = ({ transaction }) => (
        <div 
            className="flex justify-between items-center p-3 hover:bg-gray-50 rounded cursor-pointer"
            onClick={() => goTo(ROUTES.TRANSAKSI_DETAIL(transaction.id))}
        >
            <div>
                <Typography variant="body1" className="font-semibold">
                    {transaction.user}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {new Date(transaction.date).toLocaleDateString('id-ID')}
                </Typography>
            </div>
            <Typography variant="body1" className="font-semibold text-green-600">
                <Currency value={transaction.amount} />
            </Typography>
        </div>
    );

    const RecentOrderItem: React.FC<{
        order: DashboardStats['recentOrders'][0];
    }> = ({ order }) => (
        <div 
            className="flex justify-between items-center p-3 hover:bg-gray-50 rounded cursor-pointer"
            onClick={() => goTo(ROUTES.ORDER_DETAIL(order.id))}
        >
            <div>
                <Typography variant="body1" className="font-semibold">
                    {order.user}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {order.test} • {new Date(order.date).toLocaleDateString('id-ID')}
                </Typography>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-semibold ${
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
            }`}>
                {order.status}
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="p-6">
                <Typography variant="h4" className="font-semibold mb-6">
                    {PAGE_TITLES.DASHBOARD}
                </Typography>
                <div className="animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-32 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="h-64 bg-gray-200 rounded"></div>
                        <div className="h-64 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <Typography variant="h4" className="font-semibold mb-6">
                    {PAGE_TITLES.DASHBOARD}
                </Typography>
                <div className="text-center py-8">
                    <Typography color="error" className="mb-4">
                        {error}
                    </Typography>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
                    >
                        Muat Ulang
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <Typography variant="h4" className="font-semibold mb-6">
                {PAGE_TITLES.DASHBOARD}
            </Typography>

            {/* Stats Cards */}
            <Grid2 container spacing={3} className="mb-8">
                <Grid2 xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Total Pengguna"
                        value={dashboardData?.totalUsers.toLocaleString() || '0'}
                        icon={<RiUserLine className="w-6 h-6 text-white" />}
                        color="bg-blue-500"
                        onClick={() => goTo(ROUTES.MITRA)}
                    />
                </Grid2>
                <Grid2 xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Total Pendapatan"
                        value={<Currency value={dashboardData?.totalRevenue || 0} />}
                        icon={<RiMoneyDollarCircleLine className="w-6 h-6 text-white" />}
                        color="bg-green-500"
                        onClick={() => goTo(ROUTES.TRANSAKSI)}
                    />
                </Grid2>
                <Grid2 xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Total Tes"
                        value={dashboardData?.totalTests || 0}
                        icon={<RiFileTextLine className="w-6 h-6 text-white" />}
                        color="bg-purple-500"
                        onClick={() => goTo(ROUTES.LIST_TES)}
                    />
                </Grid2>
                <Grid2 xs={12} sm={6} lg={3}>
                    <StatCard
                        title="Total Order"
                        value={dashboardData?.totalOrders || 0}
                        icon={<RiTrendingUpLine className="w-6 h-6 text-white" />}
                        color="bg-orange-500"
                        onClick={() => goTo(ROUTES.ORDER)}
                    />
                </Grid2>
            </Grid2>

            {/* Recent Activities */}
            <Grid2 container spacing={3}>
                <Grid2 xs={12} lg={6}>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <Typography variant="h6" className="font-semibold">
                                    Transaksi Terbaru
                                </Typography>
                                <button 
                                    onClick={() => goTo(ROUTES.TRANSAKSI)}
                                    className="text-primary-500 hover:text-primary-600 text-sm font-semibold"
                                >
                                    Lihat Semua
                                </button>
                            </div>
                            <div className="space-y-2">
                                {dashboardData?.recentTransactions.map((transaction) => (
                                    <RecentTransactionItem 
                                        key={transaction.id} 
                                        transaction={transaction} 
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </Grid2>

                <Grid2 xs={12} lg={6}>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <Typography variant="h6" className="font-semibold">
                                    Order Terbaru
                                </Typography>
                                <button 
                                    onClick={() => goTo(ROUTES.ORDER)}
                                    className="text-primary-500 hover:text-primary-600 text-sm font-semibold"
                                >
                                    Lihat Semua
                                </button>
                            </div>
                            <div className="space-y-2">
                                {dashboardData?.recentOrders.map((order) => (
                                    <RecentOrderItem 
                                        key={order.id} 
                                        order={order} 
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </div>
    );
};

// Export with HOC wrapper for global enhancements
export default withPageEnhancements(DashboardOptimized, { layout: false });
