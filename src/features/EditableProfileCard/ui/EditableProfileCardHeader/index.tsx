import React from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/Button';
import Text from '@/shared/ui/Text';
import { HStack } from '@/shared/ui/Stack';
import TextDeprecated from '@/shared/ui/deprecated/Text';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';

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
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <HStack justify='between'>
                    <Text title={t('Профиль')} />
                    {canEdit && (
                        <Button
                            theme={editable ? 'outline_red' : 'outline'}
                            onClick={editable ? cancelEditMode : () => setEditMode(true)}
                            data-testid='EditableProfileCardHeader.CancelBtn'>
                            {editable ? t('Отменить') : t('Редактировать')}
                        </Button>
                    )}
                </HStack>
            }
            off={
                <HStack justify='between'>
                    <TextDeprecated title={t('Профиль')} />
                    {canEdit && (
                        <div>
                            {editable ? (
                                <ButtonDeprecated
                                    theme={ThemeButton.OUTLINE_RED}
                                    onClick={cancelEditMode}
                                    data-testid='EditableProfileCardHeader.CancelBtn'>
                                    {t('Отменить')}
                                </ButtonDeprecated>
                            ) : (
                                <ButtonDeprecated
                                    disabled={!!isError}
                                    theme={ThemeButton.OUTLINE}
                                    onClick={() => setEditMode(true)}
                                    data-testid='EditableProfileCardHeader.EditBtn'>
                                    {t('Редактировать')}
                                </ButtonDeprecated>
                            )}
                        </div>
                    )}
                </HStack>
            }
        />
    );
};

export default EditableProfileCardHeader;
