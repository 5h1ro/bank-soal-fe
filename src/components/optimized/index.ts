/**
 * Centralized exports for all optimized components, hooks, and utilities
 * This file provides easy access to the global optimization system
 */

// Enhanced Layout
export { default as EnhancedLayout } from '../EnhancedLayout';

// Templates
export { default as DetailPageTemplate } from '../templates/DetailPageTemplate';
export { default as ListPageTemplate } from '../templates/ListPageTemplate';

// Molecules (Reusable Components)
export { default as PageHeader } from '../molecules/PageHeader';
export { default as TestCard } from '../molecules/TestCard';

// Organisms
export { default as SnackbarProvider, useSnackbarContext } from '../organism/SnackbarProvider';

// Higher Order Components
export {
    withPageEnhancements,
    withDetailPage,
    withListPage,
    withFormPage,
    usePageUtils
} from '../../hoc/withPageEnhancements';

// Hooks
export { useSnackbar } from '../../hooks/useSnackbar';
export { useNavigation } from '../../hooks/useNavigation';
export {
    usePageData,
    useListData,
    useFormData
} from '../../hooks/usePageData';

// Constants
export { ROUTES, PAGE_TITLES, BREADCRUMBS } from '../../constants/routes';
export { CFIT_TEST_DATA, getTestById } from '../../constants/testData';

// Types
export type {
    TestData,
    TestCardProps,
    PageHeaderProps,
    SnackbarProviderProps,
    CommonPageProps,
    BasePageProps,
    ListPageProps,
    DetailPageProps,
    FormPageProps
} from '../../types/test.types';

// Re-export interface for backward compatibility
export type { snackbarType } from '../../interface/snackbar.interface';

/**
 * Quick start imports for common use cases
 */

// For Detail Pages
export const DetailPageKit = {
    Template: DetailPageTemplate,
    HOC: withDetailPage,
    useUtils: usePageUtils,
    useData: usePageData
};

// For List Pages
export const ListPageKit = {
    Template: ListPageTemplate,
    HOC: withListPage,
    useUtils: usePageUtils,
    useData: useListData
};

// For Form Pages
export const FormPageKit = {
    HOC: withFormPage,
    useUtils: usePageUtils,
    useData: useFormData
};

/**
 * Utility functions for common operations
 */
export const OptimizedUtils = {
    // Navigation helpers
    createDetailRoute: (type: string, id: string | number) => `/${type}/${id}`,
    createEditRoute: (type: string, id: string | number) => `/${type}/edit/${id}`,
    createListRoute: (type: string) => `/${type}`,
    
    // Status helpers
    getStatusColor: (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
            case 'completed':
            case 'success':
                return 'success';
            case 'pending':
            case 'warning':
                return 'warning';
            case 'inactive':
            case 'failed':
            case 'error':
                return 'error';
            default:
                return 'default';
        }
    },
    
    // Date helpers
    formatDate: (date: string | Date) => {
        return new Date(date).toLocaleDateString('id-ID');
    },
    
    formatDateTime: (date: string | Date) => {
        return new Date(date).toLocaleString('id-ID');
    },
    
    // Text helpers
    truncateText: (text: string, maxLength: number = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },
    
    // Validation helpers
    isValidEmail: (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    isValidPhone: (phone: string) => {
        const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
        return phoneRegex.test(phone);
    }
};

/**
 * Default configurations
 */
export const DefaultConfigs = {
    // Pagination
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 25, 50, 100],
    
    // Loading
    defaultLoadingDelay: 300, // ms
    
    // Snackbar
    defaultSnackbarDuration: 6000, // ms
    
    // Search
    defaultSearchDebounce: 500, // ms
    
    // Table
    defaultTableHeight: 400, // px
};

/**
 * Example usage patterns
 */
export const UsageExamples = {
    // Simple detail page
    simpleDetailPage: `
import { DetailPageKit, ROUTES, PAGE_TITLES } from '@/components/optimized';

const MyDetailPage = () => {
    const { useUtils, useData, Template, HOC } = DetailPageKit;
    const { showSuccess } = useUtils();
    const { data, loading, error } = useData(fetchFunction);
    
    return (
        <Template title={PAGE_TITLES.MY_PAGE} backPath={ROUTES.MY_LIST}>
            {/* content */}
        </Template>
    );
};

export default HOC(MyDetailPage);
    `,
    
    // Simple list page
    simpleListPage: `
import { ListPageKit, ROUTES, PAGE_TITLES } from '@/components/optimized';

const MyListPage = () => {
    const { useUtils, useData, Template, HOC } = ListPageKit;
    const { goToCreate } = useUtils();
    const { data, loading, handleSearch } = useData(fetchFunction);
    
    return (
        <Template 
            title={PAGE_TITLES.MY_LIST}
            onSearch={handleSearch}
            onAdd={() => goToCreate('my-entity')}
        >
            {/* content */}
        </Template>
    );
};

export default HOC(MyListPage);
    `
};

// Default export for convenience
export default {
    DetailPageKit,
    ListPageKit,
    FormPageKit,
    OptimizedUtils,
    DefaultConfigs,
    UsageExamples
};
