import React, { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { getUserRoles, UserRoles } from 'entities/User';
import { useSelector } from 'react-redux';

interface RoleWrapperProps {
    children: JSX.Element,
    roles?: UserRoles[]
}

const RoleWrapper = ({ children, roles }: RoleWrapperProps) => {
    const userRoles = useSelector(getUserRoles);
    const location = useLocation();
    const checkRoles = useMemo(() => roles?.some((role) => userRoles?.includes(role)), [roles, userRoles]);

    if (checkRoles) {
        return children;
    }
    return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
};

export default RoleWrapper;
