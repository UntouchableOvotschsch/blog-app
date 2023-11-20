import { memo, useCallback } from 'react';

import { useSelector } from 'react-redux';

import { ThemesConfig } from '@/shared/const/theme';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserAuthData, updateJsonSettingsService } from '@/entities/User';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';

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
        });
    }, [dispatch, toggleTheme, user]);

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <Button
                    className={classNames('', {}, [className])}
                    onClick={toggleThemeHandler}
                    style={{ display: 'flex' }}>
                    {ThemesConfig[theme]}
                </Button>
            }
            off={<ThemeSwitcherDeprecated className={className} />}
        />
    );
});
