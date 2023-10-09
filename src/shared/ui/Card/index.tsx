import { HTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ComponentTestProps } from '@/shared/types/test';

import styles from './Card.module.scss';

type CardTheme = 'primary' | 'inverted' | 'transparent'

interface CardProps extends HTMLAttributes<HTMLDivElement>, ComponentTestProps{
    className?: string;
    children: ReactNode
    cardTheme?: CardTheme
}

const Card = ({
    className,
    children,
    cardTheme = 'primary',
    ...otherProps
}: CardProps) => (
    <div
        className={classNames(styles.Card, {}, [className, styles[cardTheme]])}
        {...otherProps}
    >
        {children}
    </div>
);

export default Card;
