import { FC, Suspense } from 'react';

import './styles/index.scss';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/RouterProvider';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';

const App: FC = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                    <Navbar />
                    <div className="content">
                        <Sidebar />
                        <div className="wrapper">
                            <AppRouter />
                        </div>
                    </div>
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default App;
