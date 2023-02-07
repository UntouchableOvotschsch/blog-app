import { FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';

const AppRouter: FC = () => (
    <Suspense fallback={<div>Идет загрузка</div>}>
        <Routes>
            {Object.values(routeConfig).map(({ path, element }) => (
                <Route path={path} element={element} key={path} />
            ))}
        </Routes>
    </Suspense>
);

export default AppRouter;
