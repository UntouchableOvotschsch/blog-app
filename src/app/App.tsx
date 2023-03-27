import { FC, Suspense } from 'react';
import { AppRouter } from 'app/providers/RouterProvider';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';

const App: FC = () => (
    <div className="app">
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

export default App;
