import React, { memo } from 'react';

import AppLogoSVG from '@/shared/assets/icons/app-logo.svg';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import { HStack } from '../Stack';
import styles from './AppLogo.module.scss';

interface AppLogoProps {
    className?: string;
}

const AppLogo = memo(({ className }: AppLogoProps) => (
    <HStack justify='center' className={classNames(styles.AppLogoWrapper, {}, [className])}>
        <div className={styles.gradientBig} />
        <div className={styles.gradientSmall} />
        <AppLogoSVG className={styles.logoSvg} />
    </HStack>
));

export default AppLogo;
