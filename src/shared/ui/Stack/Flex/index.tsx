import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';

import styles from './Flex.module.scss';

type JustifyTypes = 'start' | 'end' | 'between' | 'center' | 'around' | 'evenly'

type AlignTypes = 'start' | 'center' | 'end'

type DirectionTypes = 'column' | 'row'

type GapTypes = '2' | '4' | '8' | '16' | '32'

const justifyClasses: Record<JustifyTypes, string> = {
    start: styles.justifyStart,
    end: styles.justifyEnd,
    around: styles.justifyAround,
    between: styles.justifyBetween,
    center: styles.justifyCenter,
    evenly: styles.justifyEvenly,
};

const alignClasses: Record<AlignTypes, string> = {
    start: styles.alignStart,
    end: styles.alignEnd,
    center: styles.alignCenter,
};

const directionClasses: Record<DirectionTypes, string> = {
    row: styles.directionRow,
    column: styles.directionColumn,
};

const gapClasses: Record<GapTypes, string> = {
    2: styles.gap2,
    4: styles.gap4,
    8: styles.gap8,
    16: styles.gap16,
    32: styles.gap32,
};

export interface FlexProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    className?: string;
    justify?: JustifyTypes;
    align?: AlignTypes;
    direction?: DirectionTypes;
    children: ReactNode;
    maxWidth?: boolean
    gap?: GapTypes
}

const Flex = (props: FlexProps) => {
    const {
        children,
        justify = 'start',
        className,
        align = 'center',
        direction = 'row',
        maxWidth = true,
        gap,
        ...otherProps
    } = props;

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];

    const mods: Mods = {
        [styles.maxWidth]: maxWidth,
    };

    return (
        <div className={classNames(styles.Flex, mods, classes)} {...otherProps}>
            {children}
        </div>
    );
};

export default Flex;
