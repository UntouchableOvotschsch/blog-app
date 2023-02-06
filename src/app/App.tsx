import {FC, Suspense} from 'react'


import './styles/index.scss'
import {classNames} from "shared/lib/helpers/classNames/classNames";
import { useTheme } from 'app/providers/ThemeProvider';
import {AppRouter} from "app/providers/RouterProvider";
import {Navbar} from "widgets/Navbar";
import {Sidebar} from "widgets/Sidebar";


const App: FC = () => {
    const { theme } = useTheme()
    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback=''>
                <Navbar/>
                <div className='content'>
                    <Sidebar/>
                    <div className="wrapper">
                        <AppRouter/>
                    </div>
                </div>
            </Suspense>,
        </div>
    )
}

export default App