import { FC, Suspense, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { getUserInited, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

import { AppRouter } from './providers/RouterProvider';

const App: FC = () => {
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    useEffect(() => {
        //  Иначе стреляет стремной ошибкой о невозможности парсить такой JSON
        const user: string | null = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (user) {
            const parsedUser = JSON.parse(user);
            dispatch(userActions.setAuthData(parsedUser));
        }
        dispatch(userActions.setInited(true));
    }, [dispatch]);

    return (
        <div className="app">
            <Suspense fallback="">
                <Navbar />
                <div className="content">
                    <Sidebar />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
};

export default App;
