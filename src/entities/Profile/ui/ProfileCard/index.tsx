import React, { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import Avatar from '@/shared/ui/Avatar';
import Input from '@/shared/ui/Input';
import { Loader } from '@/shared/ui/Loader';
import { VStack } from '@/shared/ui/Stack';
import Text, { TextAlign, ThemeText } from '@/shared/ui/Text';

import styles from './ProfileCard.module.scss';
import { ProfileType } from '../../model/types/profile';

interface ProfileCardProps {
    data?: ProfileType;
    editable?: boolean;
    changeProfileData: (value: ProfileType) => void;
    isLoading?: boolean;
    isError?: string;
}

const ProfileCard: FC<ProfileCardProps> = ({ data, editable, changeProfileData, isLoading, isError }) => {
    const { t } = useTranslation('profile');

    if (isLoading || isError) {
        return (
            <div className={styles.status}>
                {isLoading && <Loader />}
                {isError && (
                    <Text
                        theme={ThemeText.ERROR}
                        title={t('Произошла ошибка при получении профиля')}
                        text={t('Попробуйте обновить страницу')}
                        align={TextAlign.CENTER}
                    />
                )}
            </div>
        );
    }
    return (
        <VStack>
            <div className={styles.avatar}>
                {data?.avatar && <Avatar avatar={data?.avatar} alt={t('Ваш аватар')} />}
            </div>
            <div className={styles.formContainer}>
                <VStack gap='8'>
                    <Input
                        value={data?.firstname}
                        onChange={(value) => changeProfileData({ firstname: value })}
                        readOnly={!editable}
                        placeholder={t('Ваше имя')}
                        data-testid='ProfileCard.FirstnameInput'
                    />
                    <Input
                        value={data?.lastname}
                        onChange={(value) => changeProfileData({ lastname: value })}
                        readOnly={!editable}
                        placeholder={t('Ваша фамилия')}
                        data-testid='ProfileCard.LastnameInput'
                    />
                    <Input
                        value={data?.username}
                        onChange={(value) => changeProfileData({ username: value })}
                        readOnly={!editable}
                        placeholder={t('Ваш никнейм')}
                    />
                    <Input
                        value={data?.age}
                        onChange={(value) => changeProfileData({ age: Number(value) })}
                        readOnly={!editable}
                        type='number'
                        min='0'
                        placeholder={t('Ваш возраст')}
                    />
                    <CountrySelect
                        selectValue={data?.country}
                        editable={editable}
                        onChange={(country) =>
                            changeProfileData({
                                country,
                            })
                        }
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
                        onChange={(currency) =>
                            changeProfileData({
                                currency,
                            })
                        }
                    />

                    {editable && (
                        <Input
                            value={data?.avatar}
                            onChange={(value) => changeProfileData({ avatar: value })}
                            placeholder={t('Введите ссылку на аватар')}
                        />
                    )}
                </VStack>
            </div>
        </VStack>
    );
};

export default ProfileCard;
