import {
    memo, ReactNode, Suspense, useCallback, useMemo,
} from 'react';

import { Route, Routes } from 'react-router-dom';

import { PageLoader } from '@/widgets/PageLoader';

import { routeConfig } from '../config/routeConfig';

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
