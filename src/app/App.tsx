import {FC} from 'react'


import './styles/index.scss'
import {classNames} from "shared/lib/helpers/classNames/classNames";
import { useTheme } from 'app/providers/ThemeProvider';
import {AppRouter} from "app/providers/RouterProvider";
import {Navbar} from "widgets/Navbar";
import {ThemeSwitcher} from "widgets/ThemeSwitcher";


const App: FC = () => {
    const { theme } = useTheme()
    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar/>

            <AppRouter/>
            <ThemeSwitcher/>
        </div>
    )
}

export default App