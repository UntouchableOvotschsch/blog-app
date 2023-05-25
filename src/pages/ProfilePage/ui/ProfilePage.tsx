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
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Loader } from 'shared/ui/Loader/Loader';
import Text, { TextAlign, ThemeText } from 'shared/ui/Text/Text';
import { updateProfileData } from 'entities/Profile/model/services/updateProfileData';
import styles from './ProfilePage.module.scss';
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

    const validationErrorsTranslation = {
        [ProfileValidationErrors.INCORRECT_USER_DATA]: t('Некорректные пользовательские данные'),
        [ProfileValidationErrors.INCORRECT_AGE]: t('Некорректный возраст'),
        [ProfileValidationErrors.INCORRECT_COUNTRY]: t('Некорректная страна'),
        [ProfileValidationErrors.SERVER_ERROR]: t('Ошибка сервера'),
        [ProfileValidationErrors.NO_DATA]: t('Отсутствуют данные о профиле'),
    };

    const setEditMode = useCallback((value: boolean) => {
        dispatch(profileActions.setEditable(value));
    }, [dispatch]);

    const cancelEditMode = useCallback((value: boolean) => {
        dispatch(profileActions.setEditable(value));
        dispatch(profileActions.cancelFormChanging());
    }, [dispatch]);

    const changeProfileData = useCallback((value: ProfileType) => {
        dispatch(profileActions.changeProfileData(value));
    }, [dispatch]);

    const updateProfile = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducerList={reducers}>
            <div className={styles.container}>
                <ProfilePageHeader
                    editable={editable}
                    setEditMode={setEditMode}
                    cancelEditMode={cancelEditMode}
                    isError={isError}
                />

                {
                    isLoading || isError
                        ? (
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

                        )
                        : (
                            <ProfileCard
                                editable={editable}
                                data={formData}
                                changeProfileData={changeProfileData}
                            />
                        )
                }

                {
                    editable
                    && (
                        <div className={styles.saveBtn}>
                            <Button
                                theme={ThemeButton.OUTLINE}
                                onClick={updateProfile}
                            >
                                {t('Сохранить')}
                            </Button>
                        </div>
                    )
                }
                {validationErrors?.length && editable ? validationErrors?.map((error) => (
                    <Text
                        text={validationErrorsTranslation[error]}
                        theme={ThemeText.ERROR}
                        key={error}
                    />
                )) : null}
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
