import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { infinityToggle } from '../../helpers/infinityToggle/infinityToggle';
import { ThemeContext } from '@/shared/context/ThemeContext';
import { Themes } from '@/shared/const/theme';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Themes;
}

export const useTheme = (): UseThemeResult => {
    const {
        theme,
        setTheme,
    } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = infinityToggle(Object.values(Themes), theme) || Themes.LIGHT;
        setTheme?.(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme: theme || Themes.LIGHT,
        toggleTheme,
    };
};
