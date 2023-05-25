import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DynamicModuleLoader, { ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import {
    fetchProfileData,
    getFormData,
    getProfileEditable,
    getProfileError,
    getProfileLoading,
    profileActions,
    ProfileCard,
    profileReducer,
    ProfileType,
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
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
