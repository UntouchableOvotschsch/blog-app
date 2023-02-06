import {FC} from 'react'

import styles from './Navbar.module.scss'
import {classNames} from "shared/lib/helpers/classNames/classNames";
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";


interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({className}) => {
    return (
        <div className={classNames(styles.Navbar, {}, [className])}>
            <div className={styles.links}>
                <AppLink to={'/'} theme={AppLinkTheme.SECONDARY}>
                    Главная
                </AppLink>
                <AppLink to={'/about'} theme={AppLinkTheme.SECONDARY}>
                    О нас
                </AppLink>
            </div>
        </div>
    )
}

