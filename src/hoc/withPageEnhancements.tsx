import React from 'react';
import EnhancedLayout from '../components/EnhancedLayout';
import { useSnackbarContext } from '../components/organism/SnackbarProvider';
import { useNavigation } from '../hooks/useNavigation';

interface WithPageEnhancementsOptions {
    requireAuth?: boolean;
    layout?: boolean;
    title?: string;
}

/**
 * Higher Order Component that provides common functionality to pages:
 * - Enhanced Layout with global snackbar
 * - Navigation utilities
 * - Authentication checks
 * - Common page props
 */
export function withPageEnhancements<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    options: WithPageEnhancementsOptions = {}
) {
    const {
        requireAuth = true,
        layout = true,
        title
    } = options;

    const EnhancedComponent: React.FC<P> = (props) => {
        // If layout is disabled, render component directly
        if (!layout) {
            return <WrappedComponent {...props} />;
        }

        // Render with enhanced layout
        return (
            <EnhancedLayout>
                <WrappedComponent {...props} />
            </EnhancedLayout>
        );
    };

    EnhancedComponent.displayName = `withPageEnhancements(${WrappedComponent.displayName || WrappedComponent.name})`;

    return EnhancedComponent;
}

/**
 * Hook that provides common page utilities
 * This can be used inside any page component
 */
export const usePageUtils = () => {
    const navigation = useNavigation();
    const snackbar = useSnackbarContext();

    return {
        ...navigation,
        ...snackbar,
        // Add more common utilities here
    };
};

/**
 * HOC specifically for detail pages
 */
export function withDetailPage<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    defaultBackPath?: string
) {
    return withPageEnhancements(WrappedComponent, {
        layout: true,
        requireAuth: true
    });
}

/**
 * HOC specifically for list pages
 */
export function withListPage<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    return withPageEnhancements(WrappedComponent, {
        layout: true,
        requireAuth: true
    });
}

/**
 * HOC specifically for form pages
 */
export function withFormPage<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    return withPageEnhancements(WrappedComponent, {
        layout: true,
        requireAuth: true
    });
}
