import React from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/Stack';
import Text from '@/shared/ui/deprecated/Text';

import { getProfileCanEdit } from '../../model/selectors/getProfileCanEdit';

interface EditableProfileCardHeaderProps {
    setEditMode: (value: boolean) => void;
    cancelEditMode: () => void;
    editable?: boolean;
    isError?: string;
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
        <HStack justify='between'>
            <Text title={t('Профиль')} />
            {canEdit && (
                <div>
                    {editable ? (
                        <Button
                            theme={ThemeButton.OUTLINE_RED}
                            onClick={cancelEditMode}
                            data-testid='EditableProfileCardHeader.CancelBtn'>
                            {t('Отменить')}
                        </Button>
                    ) : (
                        <Button
                            disabled={!!isError}
                            theme={ThemeButton.OUTLINE}
                            onClick={() => setEditMode(true)}
                            data-testid='EditableProfileCardHeader.EditBtn'>
                            {t('Редактировать')}
                        </Button>
                    )}
                </div>
            )}
        </HStack>
    );
};

export default EditableProfileCardHeader;
