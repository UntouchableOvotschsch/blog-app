import React, { ImgHTMLAttributes, ReactElement, useLayoutEffect, useState } from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

const AppImage = (props: AppImageProps) => {
    const { src, alt = 'image', className, fallback, errorFallback, ...otherProps } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useLayoutEffect(() => {
        const image = new Image();
        image.src = src ?? '';
        image.onload = () => {
            setIsError(false);
            setIsLoading(false);
        };
        image.onerror = () => {
            setIsLoading(false);
            setIsError(true);
        };
    }, [alt, src]);

    if (isLoading && fallback) {
        return fallback;
    }

    if (isError && errorFallback) {
        return errorFallback;
    }

    return <img src={src} alt={alt} className={className} {...otherProps} />;
};

export default AppImage;
