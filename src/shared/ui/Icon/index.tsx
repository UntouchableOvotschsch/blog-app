import React from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import styles from './Icon.module.scss';

interface IconProps {
    className?: string
    size?: string
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>

}

const Icon = ({
    size = '20',
    className,
    Icon,
}: IconProps) => (
    <Icon
        className={classNames(styles.Icon, {}, [className])}
        width={size}
        height={size}
    />
);

export default Icon;
