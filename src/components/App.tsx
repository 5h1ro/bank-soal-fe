import { memo, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Login from '../pages/auth/login';
import NotFoundPage from '../pages/error/404';

import { AuthMiddleware, GuestMiddleware, LoginMiddleware } from '../middleware/auth.middleware';
import BuatPassword from '../pages/auth/buat_password';
import EmailDikirim from '../pages/auth/email_dikirim';
import EmailDikirimRegister from '../pages/auth/email_dikirim_register';
import EmailVerifikasi from '../pages/auth/email_verifikasi';
import LupaPassword from '../pages/auth/lupa_password';
import Register from '../pages/auth/register';
import ResetPassword from '../pages/auth/reset_password';
import VerifikasiLogin from '../pages/auth/verifikasi_login';
import { snackbarType } from '../interface/snackbar.interface';
import Mitra from '../pages/admin/mitra';
import MitraUpdate from '../pages/admin/mitra/update';
import MitraDetail from '../pages/admin/mitra/detail';
import RiwayatTes from '../pages/admin/riwayat';
import RiwayatDetail from '../pages/admin/riwayat/detail';
import Transaksi from '../pages/admin/transaksi';
import TransaksiDetail from '../pages/admin/transaksi/detail';
import Deposit from '../pages/admin/deposit';
import DepositDetail from '../pages/admin/deposit/detail';
import Mutasi from '../pages/admin/mutasi';
import Referral from '../pages/admin/referral';
import ListTes from '../pages/admin/manajemen_tes/list_tes';
import CreateListTes from '../pages/admin/manajemen_tes/list_tes/create';
import EditListTes from '../pages/admin/manajemen_tes/list_tes/edit';
import AlatTes from '../pages/admin/manajemen_tes/alat_tes';
import CreateAlatTes from '../pages/admin/manajemen_tes/alat_tes/create';
import EditAlatTes from '../pages/admin/manajemen_tes/alat_tes/edit';
import Dashboard from '../pages/admin/dashboard';
import Order from '../pages/admin/order';
import OrderDetail from '../pages/admin/order/detail';
import RiwayatOrder from '../pages/admin/riwayat_order';
import RiwayatOrderDetail from '../pages/admin/riwayat_order/detail';
import RiwayatTesPeserta from '../pages/admin/riwayat_tes';
import RiwayatDetailPeserta from '../pages/admin/riwayat_tes/detail';
import TransaksiUser from '../pages/admin/transaksi_user';
import TransaksiUserDetail from '../pages/admin/transaksi_user/detail';
import RiwayatPelanggaran from '../pages/admin/riwayat_pelanggaran';
import OrderDetailTes from '../pages/admin/order/detailTes';

const App = () => {
  const [showSnackbar, setShowSnackbar] = useState<snackbarType>({
    isOpen: false,
    message: '',
    status: 'success'
  });
  return (
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
        {/* Panel Admin*/}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order" element={<Order setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/order/:id" element={<OrderDetail setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/order/tes/:id" element={<OrderDetailTes setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/mitra" element={<Mitra setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/mitra/:id" element={<MitraDetail setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/mitra/update/:id" element={<MitraUpdate setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/riwayat" element={<RiwayatTes setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/riwayat/:id" element={<RiwayatDetail setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/riwayat-pelanggaran" element={<RiwayatPelanggaran setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/riwayat-tes" element={<RiwayatTesPeserta setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/riwayat-tes/:id" element={<RiwayatDetailPeserta setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/riwayat-order" element={<RiwayatOrder setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/riwayat-order/:id" element={<RiwayatOrderDetail setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/transaksi" element={<Transaksi setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/transaksi/:id" element={<TransaksiDetail setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/transaksi-user" element={<TransaksiUser setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/transaksi-user/:id" element={<TransaksiUserDetail setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/deposit" element={<Deposit setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/deposit/:id" element={<DepositDetail setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/riwayat-mutasi" element={<Mutasi setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/referral" element={<Referral setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/manajemen-tes/list-tes" element={<ListTes setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/manajemen-tes/list-tes/create" element={<CreateListTes setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/manajemen-tes/list-tes/edit/:id" element={<EditListTes setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/manajemen-tes/alat-tes" element={<AlatTes setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/manajemen-tes/alat-tes/create" element={<CreateAlatTes setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/manajemen-tes/alat-tes/edit/:id" element={<EditAlatTes setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
