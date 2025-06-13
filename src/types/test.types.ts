export interface TestData {
    id: string;
    category: string;
    method: string;
    title: string;
    price: number;
    description: string[];
    downloadUrl?: string;
}

export interface TestCardProps {
    test: TestData;
    onDownload?: () => void;
}

export interface PageHeaderProps {
    title: string;
    onBack?: () => void;
    backPath?: string;
    rightContent?: React.ReactNode;
}

export interface SnackbarProviderProps {
    children: React.ReactNode;
}

export interface CommonPageProps {
    showSnackBar?: import('../interface/snackbar.interface').snackbarType;
    setShowSnackbar?: React.Dispatch<React.SetStateAction<import('../interface/snackbar.interface').snackbarType>>;
}

// Global types that can be used across all pages
export interface BasePageProps {
    id?: string;
    title?: string;
    backPath?: string;
    onBack?: () => void;
}

export interface ListPageProps extends BasePageProps {
    data?: any[];
    loading?: boolean;
    onRefresh?: () => void;
    onFilter?: (filters: any) => void;
}

export interface DetailPageProps extends BasePageProps {
    data?: any;
    loading?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    onSave?: (data: any) => void;
}

export interface FormPageProps extends BasePageProps {
    initialData?: any;
    onSubmit?: (data: any) => void;
    onCancel?: () => void;
    validationSchema?: any;
}
