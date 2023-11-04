import { ReactNode } from 'react';

import ThemeLogo from '@/shared/assets/icons/theme-dark.svg';
import Icon from '@/shared/ui/Icon';

export enum Themes {
    LIGHT = 'app_light_theme',
    DARK = 'app_dark_theme',
    ORANGE = 'app_orange_theme',
}

export const ThemesConfig: Record<Themes, ReactNode> = {
    [Themes.LIGHT]: <Icon Icon={ThemeLogo} size='40' fill='inverted' />,
    [Themes.DARK]: <Icon Icon={ThemeLogo} size='40' fill='inverted' />,
    [Themes.ORANGE]: <Icon Icon={ThemeLogo} size='40' fill='inverted' />,
};
