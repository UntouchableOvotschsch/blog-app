import {FC, useState} from 'react'

import styles from './Sidebar.module.scss'
import {classNames} from "shared/lib/helpers/classNames/classNames";
import {ThemeSwitcher} from "widgets/ThemeSwitcher";


interface SidebarProps {
    className?: string
}

export const Sidebar: FC<SidebarProps> = ({className}) => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div
            className={classNames(
                styles.Sidebar,
                {[styles.collapsed]: collapsed},
                [className])}
        >
            <button onClick={() => setCollapsed(prevState => !prevState)}>toggle</button>
            <div className={styles.switchers}>
                <ThemeSwitcher/>
            </div>
        </div>
    )
}

