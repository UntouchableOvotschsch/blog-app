import React from 'react';
import Text from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { HStack } from 'shared/ui/Stack';
import { getProfileCanEdit } from '../../model/selectors/getProfileCanEdit';

interface EditableProfileCardHeaderProps {
    setEditMode: (value: boolean) => void
    cancelEditMode: () => void
    editable?: boolean
    isError?: string
}
const EditableProfileCardHeader = ({
    setEditMode,
    cancelEditMode,
    editable,
    isError,
}: EditableProfileCardHeaderProps) => {
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

export default EditableProfileCardHeader;
