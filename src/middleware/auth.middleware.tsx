import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/auth.hook';

export const AuthMiddleware = () => {
    const auth = useAuth();
    return (auth.accessToken) ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace={true} />
    )
}
export const LoginMiddleware = () => {
    const auth = useAuth();
    return (auth.accessToken) ? (
        <Navigate to="/dashboard" replace={true} />
    ) : (
        <Outlet />
    )
}

export const SuperadminMiddleware = () => {
    const auth = useAuth();
    return (auth.accessToken) ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace={true} />
    )
}

export const GuestMiddleware = () => {
    const auth = useAuth();
    return (!auth.accessToken) ? (
        <Outlet />
    ) : (
        // <Navigate to="/dashboard" state={{ from: location }} />
        <Outlet />
    )
}