/**
 * Centralized route constants for consistent navigation
 */

export const ROUTES = {
    // Auth routes
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/lupa-password',
    RESET_PASSWORD: '/reset-password',
    
    // Dashboard
    DASHBOARD: '/dashboard',
    
    // Order routes
    ORDER: '/order',
    ORDER_DETAIL: (id: string | number) => `/order/${id}`,
    ORDER_TEST_DETAIL: (id: string | number) => `/order/tes/${id}`,
    
    // Mitra routes
    MITRA: '/mitra',
    MITRA_DETAIL: (id: string | number) => `/mitra/${id}`,
    MITRA_UPDATE: (id: string | number) => `/mitra/update/${id}`,
    MITRA_CREATE: '/mitra/create',
    
    // Transaction routes
    TRANSAKSI: '/transaksi',
    TRANSAKSI_DETAIL: (id: string | number) => `/transaksi/${id}`,
    TRANSAKSI_USER: '/transaksi-user',
    TRANSAKSI_USER_DETAIL: (id: string | number) => `/transaksi-user/${id}`,
    
    // History routes
    RIWAYAT: '/riwayat',
    RIWAYAT_DETAIL: (id: string | number) => `/riwayat/${id}`,
    RIWAYAT_TES: '/riwayat-tes',
    RIWAYAT_TES_DETAIL: (id: string | number) => `/riwayat-tes/${id}`,
    RIWAYAT_ORDER: '/riwayat-order',
    RIWAYAT_ORDER_DETAIL: (id: string | number) => `/riwayat-order/${id}`,
    RIWAYAT_PELANGGARAN: '/riwayat-pelanggaran',
    
    // Deposit routes
    DEPOSIT: '/deposit',
    DEPOSIT_DETAIL: (id: string | number) => `/deposit/${id}`,
    
    // Other routes
    MUTASI: '/mutasi',
    REFERRAL: '/referral',
    
    // Test management routes
    MANAJEMEN_TES: '/manajemen-tes',
    LIST_TES: '/manajemen-tes/list-tes',
    LIST_TES_CREATE: '/manajemen-tes/list-tes/create',
    LIST_TES_EDIT: (id: string | number) => `/manajemen-tes/list-tes/edit/${id}`,
    ALAT_TES: '/manajemen-tes/alat-tes',
    ALAT_TES_CREATE: '/manajemen-tes/alat-tes/create',
    ALAT_TES_EDIT: (id: string | number) => `/manajemen-tes/alat-tes/edit/${id}`,
    TES_KATEGORI: '/manajemen-tes/kategori',
    TES_KATEGORI_CREATE: '/manajemen-tes/kategori/create',
    TES_KATEGORI_EDIT: (id: string | number) => `/manajemen-tes/kategori/edit/${id}`,
} as const;

/**
 * Page titles for consistent naming
 */
export const PAGE_TITLES = {
    DASHBOARD: 'Dashboard',
    ORDER: 'Order',
    ORDER_DETAIL: 'Detail Order',
    ORDER_TEST_DETAIL: 'Detail Tes',
    MITRA: 'Mitra',
    MITRA_DETAIL: 'Detail Mitra',
    MITRA_UPDATE: 'Edit Mitra',
    MITRA_CREATE: 'Tambah Mitra',
    TRANSAKSI: 'Transaksi',
    TRANSAKSI_DETAIL: 'Detail Transaksi',
    TRANSAKSI_USER: 'Transaksi User',
    TRANSAKSI_USER_DETAIL: 'Detail Transaksi User',
    RIWAYAT: 'Riwayat',
    RIWAYAT_DETAIL: 'Detail Riwayat',
    RIWAYAT_TES: 'Riwayat Tes',
    RIWAYAT_TES_DETAIL: 'Detail Riwayat Tes',
    RIWAYAT_ORDER: 'Riwayat Order',
    RIWAYAT_ORDER_DETAIL: 'Detail Riwayat Order',
    RIWAYAT_PELANGGARAN: 'Riwayat Pelanggaran',
    DEPOSIT: 'Deposit',
    DEPOSIT_DETAIL: 'Detail Deposit',
    MUTASI: 'Mutasi',
    REFERRAL: 'Referral',
    MANAJEMEN_TES: 'Manajemen Tes',
    LIST_TES: 'List Tes',
    LIST_TES_CREATE: 'Tambah Tes',
    LIST_TES_EDIT: 'Edit Tes',
    ALAT_TES: 'Alat Tes',
    ALAT_TES_CREATE: 'Tambah Alat Tes',
    ALAT_TES_EDIT: 'Edit Alat Tes',
    TES_KATEGORI: 'Kategori Tes',
    TES_KATEGORI_CREATE: 'Tambah Kategori',
    TES_KATEGORI_EDIT: 'Edit Kategori',
} as const;

/**
 * Navigation breadcrumbs
 */
export const BREADCRUMBS = {
    [ROUTES.DASHBOARD]: [{ label: PAGE_TITLES.DASHBOARD, path: ROUTES.DASHBOARD }],
    [ROUTES.ORDER]: [
        { label: PAGE_TITLES.DASHBOARD, path: ROUTES.DASHBOARD },
        { label: PAGE_TITLES.ORDER, path: ROUTES.ORDER }
    ],
    [ROUTES.MITRA]: [
        { label: PAGE_TITLES.DASHBOARD, path: ROUTES.DASHBOARD },
        { label: PAGE_TITLES.MITRA, path: ROUTES.MITRA }
    ],
    // Add more breadcrumbs as needed
} as const;
