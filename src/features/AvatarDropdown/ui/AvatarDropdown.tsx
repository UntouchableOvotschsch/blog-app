import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Dropdown } from '@/shared/ui/Popups';
import Avatar from '@/shared/ui/Avatar';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { getUserAuthData, getUserIsAdmin, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import styles from './AvatarDropdown.module.scss';
import { RoutePath } from '@/shared/const/router';

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
            position="bottom left"
            trigger={(
                <Avatar
                    avatar={authData.avatar}
                    alt={t('Аватар')}
                    width={50}
                    height={50}
                    className={styles.avatar}
                />
            )}
            options={[
                {
                    label: t('Профиль'),
                    href: `${RoutePath.profile}/${authData?.id}`,
                },
                ...(isAdmin ? [
                    {
                        label: t('Админка'),
                        href: RoutePath.admin,
                    },
                ] : []),
                {
                    label: t('Выйти'),
                    onClick: logoutBtn,
                },
            ]}
        />
    );
};

export default AvatarDropdown;
