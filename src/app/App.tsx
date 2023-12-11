import { FC, Suspense } from 'react';


import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { Loader } from '@/shared/ui/deprecated/Loader';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import { MainLayout } from '@/shared/layouts';

import { AppRouter } from './providers/RouterProvider';
import { useLoginByLocalStorageData } from './lib/useLoginByLocalStorageData';

const App: FC = () => {

    const {loading, inited} = useLoginByLocalStorageData()

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            off={
                <div className='app' id='app'>
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
                <div className='app_redesigned' id='app'>
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
