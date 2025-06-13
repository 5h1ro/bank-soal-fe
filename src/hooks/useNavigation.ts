import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const useNavigation = () => {
    const navigate = useNavigate();

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const goTo = useCallback((path: string) => {
        navigate(path);
    }, [navigate]);

    // Common navigation shortcuts
    const goToDashboard = useCallback(() => {
        navigate('/dashboard');
    }, [navigate]);

    const goToOrder = useCallback(() => {
        navigate('/order');
    }, [navigate]);

    const goToMitra = useCallback(() => {
        navigate('/mitra');
    }, [navigate]);

    const goToTransaksi = useCallback(() => {
        navigate('/transaksi');
    }, [navigate]);

    const goToRiwayat = useCallback(() => {
        navigate('/riwayat');
    }, [navigate]);

    const goToDeposit = useCallback(() => {
        navigate('/deposit');
    }, [navigate]);

    const goToManajemenTes = useCallback(() => {
        navigate('/manajemen-tes');
    }, [navigate]);

    // Navigation with parameters
    const goToDetail = useCallback((type: string, id: string | number) => {
        navigate(`/${type}/${id}`);
    }, [navigate]);

    const goToEdit = useCallback((type: string, id: string | number) => {
        navigate(`/${type}/edit/${id}`);
    }, [navigate]);

    const goToCreate = useCallback((type: string) => {
        navigate(`/${type}/create`);
    }, [navigate]);

    return {
        navigate,
        goBack,
        goTo,
        goToDashboard,
        goToOrder,
        goToMitra,
        goToTransaksi,
        goToRiwayat,
        goToDeposit,
        goToManajemenTes,
        goToDetail,
        goToEdit,
        goToCreate
    };
};
