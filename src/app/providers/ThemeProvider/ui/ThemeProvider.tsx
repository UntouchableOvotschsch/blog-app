import { FC, ReactNode, useEffect, useMemo, useState } from 'react';

import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { Themes } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/context/ThemeContext';

const themeFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Themes;

interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: Themes;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
    const defaultTheme: Themes = themeFromLocalStorage ?? Themes.LIGHT;

    const [theme, setTheme] = useState<Themes>(initialTheme ?? defaultTheme);

    const memoizeTheme = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    useEffect(() => {
        // Без подобных манипуляций плывут скрины в сторибуке (
        document.body.classList.add(theme);

        return () => document.body.classList.remove(theme);
    }, [theme]);

    return <ThemeContext.Provider value={memoizeTheme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
