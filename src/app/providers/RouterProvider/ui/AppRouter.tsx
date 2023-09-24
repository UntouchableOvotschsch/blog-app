import {
    memo, ReactNode, Suspense, useCallback, useMemo,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '@/shared/config/routeConfig/routeConfig';
import { PageLoader } from '@/widgets/PageLoader';

const AppRouter = memo(() => {
    const suspenseComponent = useCallback((element: ReactNode) => (
        <Suspense fallback={<PageLoader />}>
            {element}
        </Suspense>
    ), []);
    const routes = useMemo(
        () => Object.values(routeConfig)
            .map((route) => (
                <Route
                    path={route.path}
                    element={suspenseComponent(route.element)}
                    key={route.path}
                />
            )),
        [suspenseComponent],
    );
    return (
        <Routes>
            {routes}
        </Routes>
    );
});

export default AppRouter;
