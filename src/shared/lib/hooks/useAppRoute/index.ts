import { useEffect, useState } from 'react';

import { matchPath, useLocation } from 'react-router-dom';

import { AppRoutes, matchRouteToPattern } from '@/shared/const/router';

export const useAppRoute = () => {
    const location = useLocation();
    const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

    useEffect(() => {
        Object.entries(matchRouteToPattern).some(([pattern, route]) => {
            if (matchPath(pattern, location.pathname)) {
                setAppRoute(route);
                return true;
            }
            return false;
        });
    }, [location.pathname]);

    return appRoute;
};
