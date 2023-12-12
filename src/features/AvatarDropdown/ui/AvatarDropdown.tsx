import React, { useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData, getUserIsAdmin, userActions } from '@/entities/User';
import { LOCAL_STORAGE_FEATURE_FLAGS_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { getRouteAdminPage, getRouteProfilePage, getRouteSettings } from '@/shared/const/router';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import AvatarDeprecated from '@/shared/ui/deprecated/Avatar';
import Avatar from '@/shared/ui/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import { Dropdown } from '@/shared/ui/Popups';
import { useForceUpdate } from '@/shared/render/ForceUpdateProvider';

import styles from './AvatarDropdown.module.scss';

interface AvatarDropdownProps {
    className?: string;
}

const AvatarDropdown = ({ className }: AvatarDropdownProps) => {
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(getUserIsAdmin);
    const { t } = useTranslation();
    const forceUpdate = useForceUpdate();

    const logoutBtn = useCallback(() => {
        localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        localStorage.removeItem(LOCAL_STORAGE_FEATURE_FLAGS_KEY);
        dispatch(userActions.removeAuthData());
        forceUpdate();
    }, [dispatch, forceUpdate]);

    if (!authData) {
        return null;
    }

    const options = [
        {
            label: t('Профиль'),
            href: getRouteProfilePage(authData.id),
        },
        {
            label: t('Настройки'),
            href: getRouteSettings(),
        },
        ...(isAdmin
            ? [
                  {
                      label: t('Админка'),
                      href: getRouteAdminPage(),
                  },
              ]
            : []),
        {
            label: t('Выйти'),
            onClick: logoutBtn,
        },
    ];

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <Dropdown
                    className={classNames('', {}, [className])}
                    position='bottom left'
                    trigger={<Avatar avatar={authData.avatar} alt={t('Аватар')} width={48} height={48} />}
                    options={options}
                />
            }
            off={
                <DropdownDeprecated
                    className={classNames(styles.AvatarDropdownDeprecated, {}, [className])}
                    position='bottom left'
                    trigger={
                        <AvatarDeprecated
                            avatar={authData.avatar}
                            alt={t('Аватар')}
                            width={50}
                            height={50}
                            className={styles.avatar}
                        />
                    }
                    options={options}
                />
            }
        />
    );
};

export default AvatarDropdown;
