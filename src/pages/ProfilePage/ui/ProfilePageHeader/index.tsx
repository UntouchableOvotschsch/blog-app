import React from 'react';
import Text from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { getUserAuthData, UserRoles } from 'entities/User';
import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile';
import { getProfileCanEdit } from 'entities/Profile/model/selectors/getProfileCanEdit';
import styles from './ProfilePageHeader.module.scss';

interface ProfilePageProps {
    setEditMode: (value: boolean) => void
    cancelEditMode: () => void
    editable?: boolean
    isError?: string
}
const ProfileCardHeader = ({
    setEditMode,
    cancelEditMode,
    editable,
    isError,
}: ProfilePageProps) => {
    const { t } = useTranslation('profile');

    const canEdit = useSelector(getProfileCanEdit);

    return (
        <div className={styles.header}>
            <Text title={t('Профиль')} />

            {
                canEdit
                && (
                    <div>
                        {
                            editable
                                ? (
                                    <Button
                                        theme={ThemeButton.OUTLINE_RED}
                                        onClick={cancelEditMode}
                                    >
                                        {t('Отменить')}
                                    </Button>
                                )
                                : (
                                    <Button
                                        disabled={!!isError}
                                        theme={ThemeButton.OUTLINE}
                                        onClick={() => setEditMode(true)}
                                    >
                                        {t('Редактировать')}
                                    </Button>
                                )
                        }
                    </div>
                )
            }

        </div>
    );
};

export default ProfileCardHeader;
