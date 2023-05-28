import { createContext, ReactNode } from 'react';
import DarkLogo from 'shared/assets/icons/theme-dark.svg';
import LightLogo from 'shared/assets/icons/theme-light.svg';
import OrangeLogo from 'shared/assets/icons/theme-orange.svg';

export enum Themes {
    LIGHT = 'app_light_theme',
    DARK = 'app_dark_theme',
    ORANGE = 'app_orange_theme'
}

export const ThemesConfig: Record<Themes, ReactNode> = {
    [Themes.LIGHT]: <LightLogo />,
    [Themes.DARK]: <DarkLogo />,
    [Themes.ORANGE]: <OrangeLogo />,
};

export interface IThemeContext {
    theme?: Themes;
    setTheme?: (theme: Themes) => void;
}

export const ThemeContext = createContext<IThemeContext>({});
