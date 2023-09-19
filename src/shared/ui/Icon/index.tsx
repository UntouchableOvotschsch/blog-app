import React from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import styles from './Icon.module.scss';

type IconFillTypes = 'primary' | 'inverted'

interface IconProps {
    className?: string
    size?: string
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>
    fill?: IconFillTypes

}

const Icon = ({
    size = '20',
    className,
    Icon,
    fill = 'primary',
}: IconProps) => (
    <Icon
        className={classNames('', {}, [className, styles[fill]])}
        width={size}
        height={size}
    />
);

export default Icon;
