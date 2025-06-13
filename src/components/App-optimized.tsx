import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Auth components
import Register from '../pages/auth/register';
import Login from '../pages/auth/login';
import VerifikasiLogin from '../pages/auth/verifikasi_login';
import LupaPassword from '../pages/auth/lupa_password';
import ResetPassword from '../pages/auth/reset_password';
import EmailVerifikasi from '../pages/auth/email_verifikasi';
import BuatPassword from '../pages/auth/buat_password';
import EmailDikirim from '../pages/auth/email_dikirim';
import EmailDikirimRegister from '../pages/auth/email_dikirim_register';
import NotFoundPage from '../pages/404';

// Middleware
import GuestMiddleware from '../middleware/GuestMiddleware';
import LoginMiddleware from '../middleware/LoginMiddleware';

// Global optimized system
import SnackbarProvider from './organism/SnackbarProvider';
import { snackbarType } from '../interface/snackbar.interface';

// Optimized admin pages
import DashboardOptimized from '../pages/admin/dashboard-optimized';
import Order from '../pages/admin/order'; // Already optimized
import OrderDetailOptimized from '../pages/admin/order/detail-optimized';
import OrderDetailTes from '../pages/admin/order/detailTes'; // Already optimized
import MitraOptimized from '../pages/admin/mitra/index-optimized';
import MitraDetail from '../pages/admin/mitra/detail';
import MitraUpdate from '../pages/admin/mitra/update';
import RiwayatTes from '../pages/admin/riwayat';
import RiwayatDetail from '../pages/admin/riwayat/detail';
import TransaksiOptimized from '../pages/admin/transaksi/index-optimized';
import TransaksiDetailOptimized from '../pages/admin/transaksi/detail-optimized';
import TransaksiUser from '../pages/admin/transaksi_user';
import TransaksiUserDetail from '../pages/admin/transaksi_user/detail';
import DepositOptimized from '../pages/admin/deposit/index-optimized';
import DepositDetail from '../pages/admin/deposit/detail';
import Mutasi from '../pages/admin/mutasi';
import Referral from '../pages/admin/referral';
import ListTes from '../pages/admin/manajemen_tes/list_tes';
import CreateListTes from '../pages/admin/manajemen_tes/list_tes/create';
import EditListTes from '../pages/admin/manajemen_tes/list_tes/edit';
import AlatTes from '../pages/admin/manajemen_tes/alat_tes';
import CreateAlatTes from '../pages/admin/manajemen_tes/alat_tes/create';
import EditAlatTes from '../pages/admin/manajemen_tes/alat_tes/edit';
import RiwayatOrder from '../pages/admin/riwayat_order';
import RiwayatOrderDetail from '../pages/admin/riwayat_order/detail';
import RiwayatTesPeserta from '../pages/admin/riwayat_tes';
import RiwayatDetailPeserta from '../pages/admin/riwayat_tes/detail';
import RiwayatPelanggaran from '../pages/admin/riwayat_pelanggaran';

/**
 * Optimized App component with global SnackbarProvider
 * All admin pages now use the optimized system with:
 * - Global snackbar management
 * - Consistent navigation
 * - Built-in loading/error states
 * - Type-safe routing
 */
const AppOptimized = () => {
  // Global snackbar state (for backward compatibility with non-optimized pages)
  const [showSnackbar, setShowSnackbar] = useState<snackbarType>({
    isOpen: false,
    message: '',
    status: 'success'
  });

  return (
    <SnackbarProvider>
      <Routes>
        <Route element={<GuestMiddleware />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<LoginMiddleware />} />
          <Route path="/login/verifikasi" element={<VerifikasiLogin />} />
          <Route path="/lupa-password" element={<LupaPassword />} />
          <Route path="/lupa-password/:userID/:token" element={<ResetPassword />} />
          <Route path="/verifikasi-email/:userID/:token" element={<EmailVerifikasi />} />
          <Route path="/buat-password/:userID/:token" element={<BuatPassword />} />
          <Route path="/lupa-password/dikirim/:email" element={<EmailDikirim />} />
          <Route path="/register/dikirim/:email" element={<EmailDikirimRegister />} />
          
          {/* ===== OPTIMIZED ADMIN PANEL ===== */}
          
          {/* Dashboard - Optimized */}
          <Route path="/dashboard" element={<DashboardOptimized />} />
          
          {/* Order Routes - Optimized */}
          <Route path="/order" element={<Order />} />
          <Route path="/order/:id" element={<OrderDetailOptimized />} />
          <Route path="/order/tes/:id" element={<OrderDetailTes />} />
          
          {/* Mitra Routes - Optimized */}
          <Route path="/mitra" element={<MitraOptimized />} />
          <Route path="/mitra/:id" element={<MitraDetail setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          <Route path="/mitra/update/:id" element={<MitraUpdate setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          
          {/* Transaksi Routes - Optimized */}
          <Route path="/transaksi" element={<TransaksiOptimized />} />
          <Route path="/transaksi/:id" element={<TransaksiDetailOptimized />} />
          <Route path="/transaksi-user" element={<TransaksiUser setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          <Route path="/transaksi-user/:id" element={<TransaksiUserDetail setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          
          {/* Deposit Routes - Optimized */}
          <Route path="/deposit" element={<DepositOptimized />} />
          <Route path="/deposit/:id" element={<DepositDetail setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          
          {/* Riwayat Routes - To be optimized */}
          <Route path="/riwayat" element={<RiwayatTes setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          <Route path="/riwayat/:id" element={<RiwayatDetail setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          <Route path="/riwayat-pelanggaran" element={<RiwayatPelanggaran setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          <Route path="/riwayat-tes" element={<RiwayatTesPeserta setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          <Route path="/riwayat-tes/:id" element={<RiwayatDetailPeserta setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          <Route path="/riwayat-order" element={<RiwayatOrder setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          <Route path="/riwayat-order/:id" element={<RiwayatOrderDetail setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          
          {/* Other Routes - To be optimized */}
          <Route path="/riwayat-mutasi" element={<Mutasi setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          <Route path="/referral" element={<Referral setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          
          {/* Manajemen Tes Routes - To be optimized */}
          <Route path="/manajemen-tes/list-tes" element={<ListTes setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          <Route path="/manajemen-tes/list-tes/create" element={<CreateListTes setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          <Route path="/manajemen-tes/list-tes/edit/:id" element={<EditListTes setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          <Route path="/manajemen-tes/alat-tes" element={<AlatTes setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          <Route path="/manajemen-tes/alat-tes/create" element={<CreateAlatTes setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
          <Route path="/manajemen-tes/alat-tes/edit/:id" element={<EditAlatTes setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SnackbarProvider>
  );
};

export default AppOptimized;

/**
 * MIGRATION NOTES:
 * 
 * ✅ OPTIMIZED PAGES (No snackbar props needed):
 * - Dashboard: DashboardOptimized
 * - Order: Order (already optimized)
 * - Order Detail: OrderDetailOptimized  
 * - Order Test Detail: OrderDetailTes (already optimized)
 * - Mitra List: MitraOptimized
 * - Transaksi List: TransaksiOptimized
 * - Transaksi Detail: TransaksiDetailOptimized
 * - Deposit List: DepositOptimized
 * 
 * 🔄 TO BE OPTIMIZED (Still using snackbar props):
 * - Mitra Detail & Update
 * - Transaksi User pages
 * - Deposit Detail
 * - All Riwayat pages
 * - Mutasi & Referral
 * - All Manajemen Tes pages
 * 
 * 📝 NEXT STEPS:
 * 1. Create optimized versions for remaining pages
 * 2. Remove snackbar props from optimized routes
 * 3. Test all routes work correctly
 * 4. Replace original App.tsx with this optimized version
 */
