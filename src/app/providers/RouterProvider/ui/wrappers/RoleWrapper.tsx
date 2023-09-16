import React, { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserRoles, UserRoles } from 'entities/User';
import { useSelector } from 'react-redux';

interface RoleWrapperProps {
    children: React.ReactElement,
    roles: UserRoles[]
    navigateTo: string
}

const RoleWrapper = ({ children, roles, navigateTo }: RoleWrapperProps) => {
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
