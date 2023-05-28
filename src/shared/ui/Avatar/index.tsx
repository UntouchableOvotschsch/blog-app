import React from 'react';
import styles from './Avatar.module.scss';

type ImageAttributes = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt' >
interface AvatarProps extends ImageAttributes{
    avatar: string | undefined
    alt: string
}
const Avatar = ({
    avatar, alt, width = 150, height = 150, ...args
}: AvatarProps) => (
    <div className={styles.container}>
        {
            avatar
                && (
                    <img
                        src={avatar}
                        alt={alt}
                        width={width}
                        height={height}
                        {...args}
                    />
                )
        }

    </div>
);

export default Avatar;
