import { FC, Suspense, useEffect } from 'react';
import { AppRouter } from 'app/providers/RouterProvider';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { userActions } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

const App: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        //  Иначе стреляет стремной ошибкой о невозможности парсить такой JSON
        const user: string | null = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (user) {
            const parsedUser = JSON.parse(user);
            dispatch(userActions.setAuthData(parsedUser));
        }
    }, [dispatch]);

    return (
        <div className="app">
            <Suspense fallback="">
                <Navbar />
                <div className="content">
                    <Sidebar />
                    <div className="wrapper">
                        <AppRouter />
                    </div>
                </div>
            </Suspense>
        </div>
    );
};

export default App;
