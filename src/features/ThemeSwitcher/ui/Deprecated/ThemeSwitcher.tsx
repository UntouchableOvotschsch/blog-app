import { memo, useCallback } from 'react';

import { useSelector } from 'react-redux';

import { ThemesConfig } from '@/shared/const/theme';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserAuthData, updateJsonSettingsService } from '@/entities/User';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcherDeprecated = memo(({ className }: ThemeSwitcherProps) => {
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
        <Button className={classNames('', {}, [className])} theme={ThemeButton.CLEAR} onClick={toggleThemeHandler}>
            {ThemesConfig[theme]}
        </Button>
    );
});
