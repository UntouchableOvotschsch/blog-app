import { useContext } from 'react';

import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { Themes } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/context/ThemeContext';

import { infinityToggle } from '../../helpers/infinityToggle/infinityToggle';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Themes;
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

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
