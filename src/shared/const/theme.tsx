import { ReactNode } from 'react';
import LightLogo from '@/shared/assets/icons/theme-light.svg';
import DarkLogo from '@/shared/assets/icons/theme-dark.svg';
import OrangeLogo from '@/shared/assets/icons/theme-orange.svg';

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
