import React, { useCallback, useEffect } from 'react';
import { VStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import DynamicModuleLoader, { ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { ProfileCard, ProfileType } from 'entities/Profile';
import EditableProfileCardHeader from '../EditableProfileCardHeader';
import { updateProfileData } from '../../model/services/updateProfileData';
import EditableProfileCardFooter from '../EditableProfileCardFooter';
import { getProfileError } from '../../model/selectors/getProfileError';
import { getProfileLoading } from '../../model/selectors/getProfileLoading';
import { getProfileEditable } from '../../model/selectors/getProfileEditable';
import { getProfileValidationErrors } from '../../model/selectors/getProfileValidationErrors';
import { getFormData } from '../../model/selectors/getFormData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { fetchProfileData } from '../../model/services/fetchProfileData';

const reducers: ReducerList = {
    profile: profileReducer,
};

interface EditableProfileCardProps {
    id: string
}

const EditableProfileCard = ({ id }: EditableProfileCardProps) => {
    const dispatch = useAppDispatch();
    const isError = useSelector(getProfileError);
    const isLoading = useSelector(getProfileLoading);
    const editable = useSelector(getProfileEditable);
    const formData = useSelector(getFormData);
    const validationErrors = useSelector(getProfileValidationErrors);

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
        if (__PROJECT__ !== 'storybook') {
            dispatch(updateProfileData(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
            dispatch(fetchProfileData(id));
        }
    }, [dispatch, id]);
    return (
        <DynamicModuleLoader reducerList={reducers}>
            <VStack gap="16">
                <EditableProfileCardHeader
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
                <EditableProfileCardFooter
                    editable={editable}
                    updateProfile={updateProfile}
                    validationErrors={validationErrors}
                />
            </VStack>
        </DynamicModuleLoader>
    );
};

export default EditableProfileCard;
