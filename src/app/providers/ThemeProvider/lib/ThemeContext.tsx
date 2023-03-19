import { createContext, ReactNode } from 'react';
import DarkLogo from 'shared/assets/icons/theme-dark.svg';
import LightLogo from 'shared/assets/icons/theme-light.svg';

export enum Themes {
    LIGHT = 'light',
    DARK = 'dark'
}

export const ThemesConfig: Record<Themes, ReactNode> = {
    [Themes.LIGHT]: <LightLogo />,
    [Themes.DARK]: <DarkLogo />,
};

export interface IThemeContext {
    theme?: Themes
    setTheme?: (theme: Themes) => void
}

export const ThemeContext = createContext<IThemeContext>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
