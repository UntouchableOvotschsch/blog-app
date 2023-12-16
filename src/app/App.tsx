import { FC, Suspense } from 'react';

import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { Loader } from '@/shared/ui/deprecated/Loader';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import { MainLayout } from '@/shared/layouts';
import AppLoaderLayout from '@/shared/layouts/AppLoaderLayout';

import { withTheme } from './providers/ThemeProvider';
import { useAppToolbar } from './lib/useAppToolbar';
import { AppRouter } from './providers/RouterProvider';
import { useLoginByLocalStorageData } from './lib/useLoginByLocalStorageData';

const App: FC = () => {
    const { loading, inited } = useLoginByLocalStorageData();
    const toolbar = useAppToolbar();

    if (loading || !inited) {
        return (
            <ToggleFeatureComponent
                /* eslint-disable-next-line i18next/no-literal-string */
                name='isAppRedesigned'
                on={
                    <div className='app_redesigned' id='app'>
                        <AppLoaderLayout />
                    </div>
                }
                off={
                    <div className='app' id='app'>
                        <Loader className='appLoader' />
                    </div>
                }
            />
        );
    }

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            off={
                <div className='app' id='app'>
                    <Navbar />
                    <Suspense fallback=''>
                        <div className='content'>
                            <Sidebar />
                            {inited && <AppRouter />}
                        </div>
                    </Suspense>
                </div>
            }
            on={
                <div className='app_redesigned' id='app'>
                    <Suspense fallback=''>
                        <Suspense fallback=''>
                            <MainLayout
                                sidebar={<Sidebar />}
                                content={<AppRouter />}
                                header={<Navbar />}
                                toolbar={toolbar}
                            />
                        </Suspense>
                    </Suspense>
                </div>
            }
        />
    );
};

export default withTheme(App);
