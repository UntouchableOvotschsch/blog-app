import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUserRoles, UserRoles } from '@/entities/User';
import { RoutePath } from '@/shared/const/router';

interface RoleWrapperProps {
    children: React.ReactElement,
    roles: UserRoles[]
    navigateTo?: string
}

const RoleWrapper = ({ children, roles, navigateTo = RoutePath.forbidden }: RoleWrapperProps) => {
    const userRoles = useSelector(getUserRoles);
    const location = useLocation();
    const checkRoles = useMemo(() => roles
        .some((role) => userRoles?.includes(role)), [roles, userRoles]);

    if (checkRoles) {
        return children;
    }
    return <Navigate to={navigateTo} state={{ from: location }} replace />;
};

export default RoleWrapper;
