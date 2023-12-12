import { memo, useCallback } from 'react';

import { useSelector } from 'react-redux';

import { ThemesConfig } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserAuthData, updateJsonSettingsService } from '@/entities/User';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

import { ThemeSwitcherDeprecated } from './Deprecated/ThemeSwitcher';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    const dispatch = useAppDispatch();

    const user = useSelector(getUserAuthData);

    const toggleThemeHandler = useCallback(() => {
        if (!user) return undefined;
        return toggleTheme((newTheme) => {
            dispatch(updateJsonSettingsService({ userId: user?.id, newSettings: { theme: newTheme } }));
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
        });
    }, [dispatch, toggleTheme, user]);

    const ThemeTag = ThemesConfig[theme];

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={<ThemeTag onClick={toggleThemeHandler} className={className} />}
            off={<ThemeSwitcherDeprecated className={className} />}
        />
    );
});
