import React from 'react';
import { useAuthDataChecker } from 'shared/lib/hooks/useAuthDataChecker';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

const AuthWrapper = ({ children }: {children: JSX.Element}) => {
    const isAuth = useAuthDataChecker();
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }
    return children;
};

export default AuthWrapper;
