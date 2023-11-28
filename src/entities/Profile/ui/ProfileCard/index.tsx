import React, { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { Loader as LoaderDeprecated } from '@/shared/ui/deprecated/Loader';
import { HStack, VStack } from '@/shared/ui/Stack';
import TextDeprecated, { TextAlign, ThemeText } from '@/shared/ui/deprecated/Text';
import Text from '@/shared/ui/Text';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import Avatar from '@/shared/ui/Avatar';
import Input from '@/shared/ui/Input';
import Card from '@/shared/ui/Card';
import Skeleton from '@/shared/ui/Skeleton';

import ProfileCardDeprecated from './Deprecated';
import styles from './ProfileCard.module.scss';
import { ProfileType } from '../../model/types/profile';

interface ProfileCardProps {
    data?: ProfileType;
    editable?: boolean;
    changeProfileData: (value: ProfileType) => void;
    isLoading?: boolean;
    isError?: string;
}

const ProfileCard: FC<ProfileCardProps> = (props) => {
    const { t } = useTranslation();

    const { data, editable, changeProfileData, isLoading, isError } = props;

    if (isLoading || isError) {
        return (
            <ToggleFeatureComponent
                /* eslint-disable-next-line i18next/no-literal-string */
                name='isAppRedesigned'
                on={
                    <>
                        {isLoading && (
                            <Card padding='24' rounded className={styles.formContainer}>
                                <VStack gap='16'>
                                    <Skeleton width={150} height={150} border='50%' />
                                    <HStack gap='24'>
                                        <VStack gap='16'>
                                            <Skeleton width='100%' height={38} />
                                            <Skeleton width='100%' height={38} />
                                            <Skeleton width='100%' height={38} />
                                            <Skeleton width='100%' height={38} />
                                        </VStack>
                                        <VStack gap='16'>
                                            <Skeleton width='100%' height={38} />
                                            <Skeleton width='100%' height={38} />
                                            <Skeleton width='100%' height={38} />
                                            <Skeleton width='100%' height={38} />
                                        </VStack>
                                    </HStack>
                                </VStack>
                            </Card>
                        )}
                        {isError && (
                            <HStack>
                                <Text
                                    theme='error'
                                    title={t('Произошла ошибка при получении профиля')}
                                    text={t('Попробуйте обновить страницу')}
                                    align='center'
                                />
                            </HStack>
                        )}
                    </>
                }
                off={
                    <div className={styles.status}>
                        {isLoading && <LoaderDeprecated />}
                        {isError && (
                            <TextDeprecated
                                theme={ThemeText.ERROR}
                                title={t('Произошла ошибка при получении профиля')}
                                text={t('Попробуйте обновить страницу')}
                                align={TextAlign.CENTER}
                            />
                        )}
                    </div>
                }
            />
        );
    }
    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <Card padding='24' rounded className={styles.formContainer}>
                    <VStack gap='16'>
                        <Avatar avatar={data?.avatar} alt={t('Ваш аватар')} />
                        <HStack gap='24'>
                            <VStack gap='16'>
                                <Input
                                    value={data?.firstname}
                                    onChange={(value) => changeProfileData({ firstname: value })}
                                    readOnly={!editable}
                                    label={t('Имя: ')}
                                    data-testid='ProfileCard.FirstnameInput'
                                />
                                <Input
                                    value={data?.lastname}
                                    onChange={(value) => changeProfileData({ lastname: value })}
                                    readOnly={!editable}
                                    label={t('Фамилия: ')}
                                    data-testid='ProfileCard.LastnameInput'
                                />
                                <Input
                                    value={data?.username}
                                    onChange={(value) => changeProfileData({ username: value })}
                                    readOnly={!editable}
                                    label={t('Никнейм: ')}
                                />
                                <Input
                                    value={data?.age}
                                    onChange={(value) => changeProfileData({ age: Number(value) })}
                                    readOnly={!editable}
                                    type='number'
                                    min='0'
                                    label={t('Возраст: ')}
                                />
                            </VStack>
                            <VStack gap='16'>
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
                                    label={t('Город: ')}
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
                                <Input
                                    value={data?.avatar}
                                    readOnly={!editable}
                                    onChange={(value) => changeProfileData({ avatar: value })}
                                    label={t('Аватар: ')}
                                />
                            </VStack>
                        </HStack>
                    </VStack>
                </Card>
            }
            off={<ProfileCardDeprecated {...props} />}
        />
    );
};

export default ProfileCard;
