import { FC, ReactNode, useEffect, useMemo, useState } from 'react';

import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { Themes } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/context/ThemeContext';
import { useJsonSettings } from '@/entities/User';

const themeFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: Themes;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
    let defaultTheme: Themes = Themes.LIGHT;

    const [themeInited, setThemeInited] = useState(false);

    const { theme: themeFromState } = useJsonSettings();

    if (themeFromState) {
        defaultTheme = themeFromState;
    } else if (themeFromLocalStorage) {
        defaultTheme = themeFromLocalStorage as Themes;
    }

    const [theme, setTheme] = useState<Themes>(initialTheme ?? defaultTheme);

    useEffect(() => {
        if (themeFromState && !themeInited) {
            setTheme(themeFromState);
            setThemeInited(true);
        }
    }, [themeFromState, themeInited]);

    const memoizeTheme = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    useEffect(() => {
        // Без подобных манипуляций плывут скрины в сторибуке (
        document.body.classList.add(memoizeTheme.theme);

        return () => document.body.classList.remove(memoizeTheme.theme);
    }, [memoizeTheme]);

    return <ThemeContext.Provider value={memoizeTheme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
