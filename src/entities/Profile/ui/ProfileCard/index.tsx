import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'shared/ui/Input/Input';
import { ProfileType } from 'entities/Profile';
import Avatar from 'shared/ui/Avatar';
import { CurrencySelect } from 'entities/Currency';
import { CountrySelect } from 'entities/Country';
import avatarImg from 'shared/assets/tests/profileImage.jpg';
import styles from './ProfileCard.module.scss';

interface ProfileCardProps {
    data: ProfileType | undefined
    editable: boolean
    changeProfileData: (value: ProfileType) => void
}

const ProfileCard: FC<ProfileCardProps> = ({
    data, editable, changeProfileData,
}) => {
    const { t } = useTranslation('profile');

    return (
        <div className={styles.data}>
            <div className={styles.avatar}>
                <Avatar
                    avatar={__PROJECT__ === 'storybook' ? avatarImg : data?.avatar}
                    alt={t('your avatar')}
                />
            </div>
            <div className={styles.inputs}>
                <Input
                    value={data?.firstname}
                    onChange={(value) => changeProfileData({ firstname: value })}
                    readOnly={!editable}
                    placeholder={t('Ваше имя')}
                />
                <Input
                    value={data?.lastname}
                    onChange={(value) => changeProfileData({ lastname: value })}
                    readOnly={!editable}
                    placeholder={t('Ваша фамилия')}
                />
                <Input
                    value={data?.username}
                    onChange={(value) => changeProfileData({ username: value })}
                    readOnly={!editable}
                    placeholder={t('Ваша никнейм')}
                />
                <Input
                    value={data?.age}
                    onChange={(value) => changeProfileData({ age: Number(value) })}
                    readOnly={!editable}
                    type="number"
                    min="0"
                    placeholder={t('Ваш возраст')}
                />
                <CountrySelect
                    selectValue={data?.country}
                    editable={editable}
                    onChange={(country) => changeProfileData({
                        country,
                    })}
                />
                <Input
                    value={data?.city}
                    onChange={(value) => changeProfileData({ city: value })}
                    readOnly={!editable}
                    placeholder={t('Ваш город')}
                />
                <CurrencySelect
                    selectValue={data?.currency}
                    editable={editable}
                    onChange={(currency) => changeProfileData({
                        currency,
                    })}
                />

                {
                    editable
                    && (
                        <Input
                            value={data?.avatar}
                            onChange={(value) => changeProfileData({ avatar: value })}
                            placeholder={t('Введите ссылку на аватар')}
                        />
                    )
                }
            </div>
        </div>

    );
};

export default ProfileCard;
