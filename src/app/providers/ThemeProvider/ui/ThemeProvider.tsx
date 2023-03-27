import {
    FC, ReactNode, useEffect, useMemo, useState,
} from 'react';
import { LOCAL_STORAGE_THEME_KEY, ThemeContext, Themes } from '../lib/ThemeContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Themes || Themes.LIGHT;

interface ThemeProviderProps {
    children: ReactNode
    initialTheme?: Themes
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
    const [theme, setTheme] = useState<Themes>(initialTheme || defaultTheme);

    const memoizeTheme = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    useEffect(() => {
        document.body.className = memoizeTheme.theme;
    }, [memoizeTheme]);

    return (
        <ThemeContext.Provider value={memoizeTheme}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
