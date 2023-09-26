import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthDataChecker } from '@/entities/User';
import { RoutePath } from '@/shared/const/router';

interface AuthWrapperProps {
    children: React.ReactElement
    navigateTo?: string
}
const AuthWrapper = ({ children, navigateTo = RoutePath.main }: AuthWrapperProps) => {
    const isAuth = useAuthDataChecker();
    const location = useLocation();

    if (isAuth) {
        return children;
    }
    return <Navigate to={navigateTo} state={{ from: location }} replace />;
};

export default AuthWrapper;
