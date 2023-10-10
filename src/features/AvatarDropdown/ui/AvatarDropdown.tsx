import React, { useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData, getUserIsAdmin, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { getRouteAdminPage, getRouteProfilePage } from '@/shared/const/router';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import Avatar from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';

import styles from './AvatarDropdown.module.scss';

interface AvatarDropdownProps {
    className?: string;
}

const AvatarDropdown = ({ className }: AvatarDropdownProps) => {
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(getUserIsAdmin);
    const { t } = useTranslation();

    const logoutBtn = useCallback(() => {
        localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        dispatch(userActions.removeAuthData());
    }, [dispatch]);

    if (!authData) {
        return null;
    }
    return (
        <Dropdown
            className={classNames('', {}, [className])}
            position='bottom left'
            trigger={
                <Avatar avatar={authData.avatar} alt={t('Аватар')} width={50} height={50} className={styles.avatar} />
            }
            options={[
                {
                    label: t('Профиль'),
                    href: getRouteProfilePage(authData.id),
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
            ]}
        />
    );
};

export default AvatarDropdown;
