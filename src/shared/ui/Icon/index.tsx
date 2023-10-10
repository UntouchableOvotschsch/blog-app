import React from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import styles from './Icon.module.scss';

type IconFillTypes = 'primary' | 'inverted';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    size?: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    fill?: IconFillTypes;
}

const Icon = ({ size = '20', className, Icon, fill = 'primary', ...otherProps }: IconProps) => (
    <Icon className={classNames('', {}, [className, styles[fill]])} width={size} height={size} {...otherProps} />
);

export default Icon;
