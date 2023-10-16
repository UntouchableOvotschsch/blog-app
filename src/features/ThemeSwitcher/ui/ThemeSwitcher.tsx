import { memo, useCallback } from 'react';

import { useSelector } from 'react-redux';

import { ThemesConfig } from '@/shared/const/theme';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserAuthData, updateJsonSettingsService } from '@/entities/User';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    const dispatch = useAppDispatch();

    const user = useSelector(getUserAuthData);

    const toggleThemeHandler = useCallback(() => {
        if (user) {
            return toggleTheme((newTheme) => {
                dispatch(updateJsonSettingsService({ userId: user?.id, newSettings: { theme: newTheme } }));
                localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
            });
        }
        return toggleTheme((newTheme) => {
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
        });
    }, [dispatch, toggleTheme, user]);

    return (
        <Button className={classNames('', {}, [className])} theme={ThemeButton.CLEAR} onClick={toggleThemeHandler}>
            {ThemesConfig[theme]}
        </Button>
    );
});
