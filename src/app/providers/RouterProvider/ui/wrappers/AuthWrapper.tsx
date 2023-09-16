import React from 'react';
import { useAuthDataChecker } from 'shared/lib/hooks/useAuthDataChecker';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthWrapperProps {
    children: React.ReactElement
    navigateTo: string
}
const AuthWrapper = ({ children, navigateTo }: AuthWrapperProps) => {
    const isAuth = useAuthDataChecker();
    const location = useLocation();

    if (isAuth) {
        return children;
    }
    return <Navigate to={navigateTo} state={{ from: location }} replace />;
};

export default AuthWrapper;
