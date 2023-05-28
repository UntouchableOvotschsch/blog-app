import { memo, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
import { useAuthDataChecker } from 'shared/lib/hooks/useAuthDataChecker';

const AppRouter = memo(() => {
    const isAuth = useAuthDataChecker();
    const routes = useMemo(() => Object.values(routeConfig)
        .filter((route) => {
            if (route.authOnly && !isAuth) {
                return false;
            }
            return true;
        }), [isAuth]);
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {routes.map((route) => (
                    <Route path={route.path} element={route.element} key={route.path} />
                ))}
            </Routes>
        </Suspense>
    );
});

export default AppRouter;
