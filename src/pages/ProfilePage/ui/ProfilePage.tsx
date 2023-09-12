import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DynamicModuleLoader, { ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import {
    fetchProfileData,
    getFormData,
    getProfileEditable,
    getProfileError,
    getProfileLoading,
    getProfileValidationErrors,
    profileActions,
    ProfileCard,
    profileReducer,
    ProfileType,
    ProfileValidationErrors,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { Button, SizeButton, ThemeButton } from 'shared/ui/Button/Button';
import Text, { ThemeText } from 'shared/ui/Text/Text';
import { updateProfileData } from 'entities/Profile/model/services/updateProfileData';
import { useParams } from 'react-router-dom';
import { PageWrapper } from 'widgets/PageWrapper';
import { HStack, VStack } from 'shared/ui/Stack';
import ProfilePageHeader from './ProfilePageHeader';

const reducers: ReducerList = {
    profile: profileReducer,
};
const ProfilePage = () => {
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    const isError = useSelector(getProfileError);
    const isLoading = useSelector(getProfileLoading);
    const editable = useSelector(getProfileEditable);
    const formData = useSelector(getFormData);
    const validationErrors = useSelector(getProfileValidationErrors);
    const { id } = useParams<{id: string}>();

    const validationErrorsTranslation = {
        [ProfileValidationErrors.INCORRECT_USER_DATA]: t('Некорректные пользовательские данные'),
        [ProfileValidationErrors.INCORRECT_AGE]: t('Некорректный возраст'),
        [ProfileValidationErrors.INCORRECT_COUNTRY]: t('Некорректная страна'),
        [ProfileValidationErrors.SERVER_ERROR]: t('Ошибка сервера'),
        [ProfileValidationErrors.NO_DATA]: t('Отсутствуют данные о профиле'),
        [ProfileValidationErrors.NO_RIGHTS_TO_EDIT]: t('Нет прав для редактирования'),
    };

    const setEditMode = useCallback((value: boolean) => {
        dispatch(profileActions.setEditable(value));
    }, [dispatch]);

    const cancelEditMode = useCallback(() => {
        dispatch(profileActions.cancelFormChanging());
    }, [dispatch]);

    const changeProfileData = useCallback((value: ProfileType) => {
        dispatch(profileActions.changeProfileData(value));
    }, [dispatch]);

    const updateProfile = useCallback(() => {
        if (__PROJECT__ !== 'storybook' && id) {
            dispatch(updateProfileData(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && id) {
            dispatch(fetchProfileData(id));
        }
        // eslint-disable-next-line
    }, [])

    return (
        <DynamicModuleLoader reducerList={reducers}>
            <PageWrapper>
                <VStack gap="16">
                    <ProfilePageHeader
                        editable={editable}
                        setEditMode={setEditMode}
                        cancelEditMode={cancelEditMode}
                        isError={isError}
                    />

                    <ProfileCard
                        editable={editable}
                        data={formData}
                        changeProfileData={changeProfileData}
                        isLoading={isLoading}
                        isError={isError}
                    />

                    <HStack justify="between">
                        <VStack maxWidth={false} gap="4" align="start">
                            {!!validationErrors?.length && validationErrors?.map((error) => (
                                <Text
                                    text={validationErrorsTranslation[error]}
                                    theme={ThemeText.ERROR}
                                    key={error}
                                />
                            ))}
                        </VStack>
                        {
                            editable
                            && (

                                <Button
                                    theme={ThemeButton.OUTLINE}
                                    onClick={updateProfile}
                                    size={SizeButton.M}
                                >
                                    {t('Сохранить')}
                                </Button>
                            )
                        }
                    </HStack>
                </VStack>
            </PageWrapper>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
