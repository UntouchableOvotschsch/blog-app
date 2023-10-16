import { useContext } from 'react';

import { Themes } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/context/ThemeContext';

import { infinityToggle } from '../../helpers/infinityToggle/infinityToggle';

interface UseThemeResult {
    toggleTheme: (saveAction: (newTheme: Themes) => void) => void;
    theme: Themes;
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (saveAction: (newTheme: Themes) => void) => {
        const newTheme = infinityToggle(Object.values(Themes), theme ?? Themes.LIGHT);
        setTheme?.(newTheme);
        saveAction(newTheme);
    };

    return {
        theme: theme || Themes.LIGHT,
        toggleTheme,
    };
};
