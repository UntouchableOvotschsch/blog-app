import React from 'react';

import { useTranslation } from 'react-i18next';

import { Button as ButtonDeprecated, SizeButton, ThemeButton } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/Button';
import Text from '@/shared/ui/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import TextDeprecated, { ThemeText } from '@/shared/ui/deprecated/Text';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';

import { ProfileValidationErrors } from '../../model/consts';

interface EditableProfileCardFooterProps {
    validationErrors: ProfileValidationErrors[];
    editable: boolean;
    updateProfile: () => void;
}

const EditableProfileCardFooter = ({ validationErrors, editable, updateProfile }: EditableProfileCardFooterProps) => {
    const { t } = useTranslation('profile');

    const validationErrorsTranslation = {
        [ProfileValidationErrors.INCORRECT_USER_DATA]: t('Некорректные пользовательские данные'),
        [ProfileValidationErrors.INCORRECT_AGE]: t('Некорректный возраст'),
        [ProfileValidationErrors.INCORRECT_COUNTRY]: t('Некорректная страна'),
        [ProfileValidationErrors.SERVER_ERROR]: t('Ошибка сервера'),
        [ProfileValidationErrors.NO_DATA]: t('Отсутствуют данные о профиле'),
        [ProfileValidationErrors.NO_RIGHTS_TO_EDIT]: t('Нет прав для редактирования'),
    };

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <HStack justify='between'>
                    <VStack maxWidth={false} gap='4' align='start'>
                        {!!validationErrors?.length &&
                            validationErrors?.map((error) => (
                                <Text
                                    text={validationErrorsTranslation[error]}
                                    theme='error'
                                    key={error}
                                    data-testid='EditableProfileCardFooter.Error'
                                />
                            ))}
                    </VStack>
                    {editable && (
                        <Button theme='outline' onClick={updateProfile} data-testid='EditableProfileCardFooter.SaveBtn'>
                            {t('Сохранить')}
                        </Button>
                    )}
                </HStack>
            }
            off={
                <HStack justify='between'>
                    <VStack maxWidth={false} gap='4' align='start'>
                        {!!validationErrors?.length &&
                            validationErrors?.map((error) => (
                                <TextDeprecated
                                    text={validationErrorsTranslation[error]}
                                    theme={ThemeText.ERROR}
                                    key={error}
                                    data-testid='EditableProfileCardFooter.Error'
                                />
                            ))}
                    </VStack>
                    {editable && (
                        <ButtonDeprecated
                            theme={ThemeButton.OUTLINE}
                            onClick={updateProfile}
                            size={SizeButton.M}
                            data-testid='EditableProfileCardFooter.SaveBtn'>
                            {t('Сохранить')}
                        </ButtonDeprecated>
                    )}
                </HStack>
            }
        />
    );
};

export default EditableProfileCardFooter;
