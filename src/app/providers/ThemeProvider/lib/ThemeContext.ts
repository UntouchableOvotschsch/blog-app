import { createContext } from 'react';

export enum Themes {
    LIGHT = 'light',
    DARK = 'dark'
}

export interface IThemeContext {
    theme?: Themes
    setTheme?: (theme: Themes) => void
}

export const ThemeContext = createContext<IThemeContext>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
