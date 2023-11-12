import React from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { typedMemo } from '@/shared/lib/helpers/typedMemo';

import styles from './Text.module.scss';

type ThemeVariant = 'primary' | 'error' | 'accent';

type SizeVariant = 'size_m' | 'size_l' | 'size_xl';

type AlignVariant = 'right' | 'left' | 'center' | 'justify';

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<SizeVariant, HeaderTagType> = {
    size_m: 'h3',
    size_l: 'h2',
    size_xl: 'h1',
};

interface TextProps {
    classname?: string;
    title?: string;
    text?: string;
    theme?: ThemeVariant;
    align?: AlignVariant;
    size?: SizeVariant;
    'data-testid'?: string;
}

const Text = typedMemo(
    ({
        classname,
        title,
        text,
        theme = 'primary',
        align = 'left',
        size = 'size_m',
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
