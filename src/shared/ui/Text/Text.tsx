import React, { memo } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import styles from './Text.module.scss';

export enum ThemeText {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
    JUSTIFY = 'justify'
}

interface TextProps {
    classname?: string
    title?: string
    text?: string
    theme?: ThemeText
    align?: TextAlign
    size?: TextSize
}
const Text = memo(({
    classname,
    title,
    text,
    theme = ThemeText.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
}: TextProps) => (
    <div className={classNames(
        '',
        {},
        [classname, styles[theme], styles[align], styles[size]],
    )}
    >
        {title && <h3 className={styles.title}>{title}</h3>}
        {text && <p className={styles.text}>{text}</p>}
    </div>
));

export default Text;
