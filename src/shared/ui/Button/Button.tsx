import React, {FC} from 'react'

import styles from './Button.module.scss'
import {classNames} from "shared/lib/helpers/classNames/classNames";



export enum ThemeButton {
    CLEAR = 'clear'

}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string,
    theme?: ThemeButton
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        onClick,
        theme = ThemeButton.CLEAR,
        ...otherProps} = props


    return (
        <button
            onClick={onClick}
            className={classNames(
                styles.Button,
                {},
                [className, styles[theme]])
            }
            {...otherProps}
        >
            {
                children
            }
        </button>
    )
}

