import React from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import styles from './Avatar.module.scss';

type ImageAttributes = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt' >
interface AvatarProps extends ImageAttributes{
    className?: string
    avatar: string | undefined
    alt: string
}
const Avatar = ({
    className,
    avatar,
    alt,
    width = 150,
    height = 150,
    ...args
}: AvatarProps) => {
    const { theme } = useTheme();
    return (
        <div className={classNames(styles.container, {}, [className])}>
            <img
                className={styles.image}
                src={avatar}
                alt={alt}
                width={width}
                height={height}
                {...args}
            />
        </div>
    );
};

export default Avatar;
