import { FC, Suspense, useEffect } from 'react';
import { AppRouter } from 'app/providers/RouterProvider';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { useDispatch } from 'react-redux';
import { User, userActions } from 'entities/User';

const App: FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const user: User = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY));
        if (user) {
            dispatch(userActions.setAuthData(user));
        }
    }, [dispatch]);

    return (
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
};

export default App;
