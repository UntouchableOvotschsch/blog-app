import React, { memo } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

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
    JUSTIFY = 'justify',
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.M]: 'h3',
    [TextSize.L]: 'h2',
    [TextSize.XL]: 'h1',
};

interface TextProps {
    classname?: string;
    title?: string;
    text?: string;
    theme?: ThemeText;
    align?: TextAlign;
    size?: TextSize;
    'data-testid'?: string;
}

/**
 * @deprecated
 */

const Text = memo(
    ({
        classname,
        title,
        text,
        theme = ThemeText.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
        'data-testid': dataTestId = 'Text',
    }: TextProps) => {
        const HeaderTag = mapSizeToHeaderTag[size];
        return (
            <div className={classNames('', {}, [classname, styles[theme], styles[align], styles[size]])}>
                {title && (
                    <HeaderTag className={styles.title} data-testid={`${dataTestId}.Title`}>
                        {title}
                    </HeaderTag>
                )}
                {text && (
                    <p className={styles.text} data-testid={`${dataTestId}.Text`}>
                        {text}
                    </p>
                )}
            </div>
        );
    },
);

export default Text;
