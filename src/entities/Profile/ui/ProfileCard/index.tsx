import React from 'react';
import { useSelector } from 'react-redux';
import { getProfileData, getProfileError, getProfileLoading } from 'entities/Profile';
import { useTranslation } from 'react-i18next';
import Text from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import Input from 'shared/ui/Input/Input';
import styles from './ProfileCard.module.scss';

const ProfileCard = () => {
    const { t } = useTranslation();
    const data = useSelector(getProfileData);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileLoading);
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Text title={t('Профиль')} />
                <Button theme={ThemeButton.OUTLINE}>
                    {t('Редактировать')}
                </Button>
            </div>
            <div className={styles.data}>
                <div className={styles.avatar}>
                    <img
                        src={data?.avatar}
                        alt={t('your avatar')}
                        width="148px"
                        height="148px"
                    />
                </div>
                <div className={styles.inputs}>
                    <Input value={data?.firstname} disabled />
                    <Input value={data?.lastname} disabled />
                    <Input value={data?.username} disabled />
                    <Input value={data?.age} disabled />
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
