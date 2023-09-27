import { createContext } from 'react';

import { Themes } from '@/shared/const/theme';

export interface IThemeContext {
    theme?: Themes;
    setTheme?: (theme: Themes) => void;
}

export const ThemeContext = createContext<IThemeContext>({});
