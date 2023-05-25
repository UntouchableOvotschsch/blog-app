import React from 'react';
import Text from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import styles from './ProfilePageHeader.module.scss';

interface ProfilePageProps {
    setEditMode: (value: boolean) => void
    cancelEditMode: (value: boolean) => void
    editable: boolean
}
const ProfileCardHeader = ({ setEditMode, cancelEditMode, editable }: ProfilePageProps) => {
    const { t } = useTranslation('profile');
    return (
        <div className={styles.header}>
            <Text title={t('Профиль')} />
            {
                editable
                    ? (
                        <Button
                            theme={ThemeButton.OUTLINE_RED}
                            onClick={() => cancelEditMode(false)}
                        >
                            {t('Отменить')}
                        </Button>
                    )
                    : (
                        <Button
                            theme={ThemeButton.OUTLINE}
                            onClick={() => setEditMode(true)}
                        >
                            {t('Редактировать')}
                        </Button>
                    )
            }
        </div>
    );
};

export default ProfileCardHeader;
