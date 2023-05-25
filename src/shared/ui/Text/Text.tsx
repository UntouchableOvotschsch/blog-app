import React, { memo } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import styles from './Text.module.scss';

export enum ThemeText {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center'
}

interface TextProps {
    classname?: string
    title?: string
    text?: string
    theme?: ThemeText
    align?: TextAlign
}
const Text = memo(({
    classname,
    title,
    text,
    theme = ThemeText.PRIMARY,
    align = TextAlign.LEFT,
}: TextProps) => (
    <div className={classNames(
        styles.container,
        {},
        [classname, styles[theme], styles[align]],
    )}
    >
        {title && <h3 className={styles.title}>{title}</h3>}
        {text && <p className={styles.text}>{text}</p>}
    </div>
));

export default Text;
