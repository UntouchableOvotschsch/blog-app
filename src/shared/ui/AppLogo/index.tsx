import React from 'react';

import AppLogoSVG from '@/shared/assets/icons/app-logo.svg';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { typedMemo } from '@/shared/lib/helpers/typedMemo';

import { HStack } from '../Stack';
import styles from './AppLogo.module.scss';

interface AppLogoProps {
    className?: string;
    size?: number;
}

const AppLogo = typedMemo(({ className, size = 60 }: AppLogoProps) => (
    <HStack justify='center' className={classNames(styles.AppLogoWrapper, {}, [className])}>
        <div className={styles.gradientBig} />
        <div className={styles.gradientSmall} />
        <AppLogoSVG className={styles.logoSvg} width={size} height={size} />
    </HStack>
));

export default AppLogo;
