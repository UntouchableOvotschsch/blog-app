import React from 'react';
import Text from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getProfileCanEdit } from 'entities/Profile/model/selectors/getProfileCanEdit';
import { HStack } from 'shared/ui/Stack';

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
        <HStack justify="between">
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

        </HStack>
    );
};

export default ProfileCardHeader;
