import { useContext } from 'react';
import { infinityToggle } from 'shared/lib/helpers/infinityToggle/infinityToggle';
import { LOCAL_STORAGE_THEME_KEY, ThemeContext, Themes } from './ThemeContext';

interface UseThemeResult {
    toggleTheme: () => void
    theme: Themes
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = infinityToggle(Object.values(Themes), theme);
        setTheme(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme,
        toggleTheme,
    };
};
