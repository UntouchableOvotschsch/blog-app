import { FC } from 'react';

import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Themes, useTheme } from 'app/providers/ThemeProvider';

import DarkLogo from 'shared/assets/icons/theme-dark.svg';
import LightLogo from 'shared/assets/icons/theme-light.svg';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import styles from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <Button
            className={classNames(styles.ThemeSwitcher, {}, [className])}
            theme={ThemeButton.CLEAR}
            onClick={toggleTheme}
        >
            {theme === Themes.DARK
                ? <DarkLogo />
                : <LightLogo />}
        </Button>
    );
};
