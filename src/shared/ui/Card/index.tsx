import { HTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ComponentTestProps } from '@/shared/types/testing';

import styles from './Card.module.scss';

type CardVariant = 'primary' | 'outlined' | 'light' | 'transparent';
type CardPadding = '0' | '8' | '16' | '24';

const mapPaddingToClass: Record<CardPadding, string> = {
    0: styles.gap_0,
    8: styles.gap_8,
    16: styles.gap_16,
    24: styles.gap_24,
};

interface CardProps extends HTMLAttributes<HTMLDivElement>, ComponentTestProps {
    className?: string;
    children: ReactNode;
    theme?: CardVariant;
    padding?: CardPadding;
    rounded?: boolean;
}

const Card = ({ className, children, theme = 'primary', padding = '8', rounded = false, ...otherProps }: CardProps) => (
    <div
        className={classNames(styles.Card, { [styles.rounded]: rounded }, [
            className,
            styles[theme],
            mapPaddingToClass[padding],
        ])}
        {...otherProps}>
        {children}
    </div>
);

export default Card;
