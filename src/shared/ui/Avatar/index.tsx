import React from 'react';

import AvatarIcon from '@/shared/assets/icons/avatar.svg';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import Icon from '../Icon';
import Skeleton from '../Skeleton';
import AppImage from '../AppImage';
import styles from './Avatar.module.scss';

type ImageAttributes = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt'>;
interface AvatarProps extends ImageAttributes {
    className?: string;
    avatar: string | undefined;
    alt: string;
}
const Avatar = ({ className, avatar, alt, width = 150, height = 150, ...args }: AvatarProps) => (
    <AppImage
        fallback={<Skeleton width={width} height={height} border='50%' />}
        errorFallback={<Icon Icon={AvatarIcon} width={width} height={height} />}
        className={classNames(styles.image, {}, [className])}
        src={avatar}
        alt={alt}
        width={width}
        height={height}
        {...args}
    />
);

export default Avatar;
