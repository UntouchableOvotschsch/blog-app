import {
    FC, ReactNode, useEffect, useMemo, useState,
} from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { ThemeContext } from '@/shared/context/ThemeContext';
import { Themes } from '@/shared/const/theme';

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
        // Без подобных манипуляций плывут скрины в сторибуке (
        document.body.classList.add(memoizeTheme.theme);

        return () => document.body.classList.remove(memoizeTheme.theme);
    }, [memoizeTheme]);

    return (
        <ThemeContext.Provider value={memoizeTheme}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
