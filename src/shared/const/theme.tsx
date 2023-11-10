import { ReactElement } from 'react';

import ThemeLogoDeprecated from '@/shared/assets/icons/theme-dark.svg';
import IconDeprecated from '@/shared/ui/deprecated/Icon';
import Icon from '@/shared/ui/Icon';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import ThemeLogo from '@/shared/assets/icons/Redesigned/theme-icon.svg';

export enum Themes {
    LIGHT = 'app_light_theme',
    DARK = 'app_dark_theme',
    ORANGE = 'app_orange_theme',
}

export const ThemesConfig: Record<Themes, ReactElement> = {
    [Themes.LIGHT]: (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={<Icon Icon={ThemeLogo} />}
            off={<IconDeprecated Icon={ThemeLogoDeprecated} size='40' fill='inverted' />}
        />
    ),
    [Themes.DARK]: (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={<Icon Icon={ThemeLogo} />}
            off={<IconDeprecated Icon={ThemeLogoDeprecated} size='40' fill='inverted' />}
        />
    ),
    [Themes.ORANGE]: (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={<Icon Icon={ThemeLogo} />}
            off={<IconDeprecated Icon={ThemeLogoDeprecated} size='40' fill='inverted' />}
        />
    ),
};
