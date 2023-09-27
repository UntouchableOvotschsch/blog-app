import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useAuthDataChecker } from '@/entities/User';
import { getRouteMainPage } from '@/shared/const/router';

interface AuthWrapperProps {
    children: React.ReactElement
    navigateTo?: string
}
const AuthWrapper = ({ children, navigateTo = getRouteMainPage() }: AuthWrapperProps) => {
    const isAuth = useAuthDataChecker();
    const location = useLocation();

    if (isAuth) {
        return children;
    }
    return <Navigate to={navigateTo} state={{ from: location }} replace />;
};

export default AuthWrapper;
