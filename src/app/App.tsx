import { FC, Suspense, useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserInited, User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { loginByUsername } from '@/features/AuthByUsername';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { getRouteLogin } from '@/shared/const/router';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import { MainLayout } from '@/shared/layouts';

import { AppRouter } from './providers/RouterProvider';

const App: FC = () => {
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    const [loading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const loginByLocalStorageData = useCallback(async () => {
        const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (user) {
            const { username, password }: User = JSON.parse(user);
            try {
                await dispatch(loginByUsername({ username, password: password! })).unwrap();
            } catch (e) {
                navigate(getRouteLogin());
            } finally {
                dispatch(userActions.setInited(true));
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
            dispatch(userActions.setInited(true));
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        loginByLocalStorageData().then();
    }, [loginByLocalStorageData]);

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            off={
                <div className='app'>
                    <Suspense fallback=''>
                        {loading ? (
                            <Loader className='appLoader' />
                        ) : (
                            <>
                                <Navbar />
                                <div className='content'>
                                    <Sidebar />
                                    {inited && <AppRouter />}
                                </div>
                            </>
                        )}
                    </Suspense>
                </div>
            }
            on={
                <div className='app_redesigned'>
                    <Suspense fallback=''>
                        {loading ? (
                            <Loader className='appLoader' />
                        ) : (
                            <Suspense fallback=''>
                                <MainLayout sidebar={<Sidebar />} content={<AppRouter />} header={<Navbar />} />
                            </Suspense>
                        )}
                    </Suspense>
                </div>
            }
        />
    );
};

export default App;
