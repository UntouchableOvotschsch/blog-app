import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement>{
    className?: string;
    children: ReactNode
}

const Card = ({ className, children, ...otherProps }: CardProps) => (
    <div
        className={classNames(styles.Card, {}, [className])}
        {...otherProps}
    >
        {children}
    </div>
);

export default Card;
