import {FC} from 'react'

import styles from './ThemeSwitcher.module.scss'
import {classNames} from "shared/lib/helpers/classNames/classNames";
import {useTheme} from "app/providers/ThemeProvider";

import darkLogo from 'shared/assets/icons/theme-dark.svg'
import lightLogo from 'shared/assets/icons/theme-dark.svg'


interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({className}) => {
    const {theme, toggleTheme} = useTheme()
    return (
        <button
            onClick={toggleTheme}
            className={classNames(
                styles.ThemeSwitcher,
                {},
                [className])
        }>
            {theme}
            <img src={darkLogo}/>
        </button>
    )
}

