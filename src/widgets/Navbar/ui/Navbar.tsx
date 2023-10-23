import React, { memo } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { HStack } from '@/shared/ui/Stack';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';

import styles from './Navbar.module.scss';
import { NavbarDeprecated } from './Deprecated/NavbarDeprecated';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const authData = useSelector(getUserAuthData);
    const { t } = useTranslation();

    if (authData) {
        return (
            <ToggleFeatureComponent
                /* eslint-disable-next-line i18next/no-literal-string */
                name='isAppRedesigned'
                on={
                    <header className={classNames(styles.Navbar, {}, [className])}>
                        <HStack justify='end' gap='16'>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
                off={<NavbarDeprecated />}
            />
        );
    }

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={<NavbarDeprecated />}
            off={<NavbarDeprecated />}
        />
    );
});
