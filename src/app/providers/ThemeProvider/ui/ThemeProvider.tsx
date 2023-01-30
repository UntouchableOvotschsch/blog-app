import {FC, useMemo, useState} from 'react'
import {LOCAL_STORAGE_THEME_KEY, ThemeContext, Themes} from "../lib/ThemeContext";


const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Themes || Themes.LIGHT

const ThemeProvider: FC = ({children}) => {
    const [theme, setTheme] = useState<Themes>(defaultTheme)

    const memoizeTheme = useMemo(() => ({
        theme: theme,
        setTheme: setTheme
    }), [theme])


    return (
        <ThemeContext.Provider value={memoizeTheme}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider