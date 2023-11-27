import React, { useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { VStack } from '@/shared/ui/Stack';
import { Select, SelectOptions } from '@/shared/ui/Popups';
import { getFeatureFlag } from '@/shared/lib/features/featureFlagsHandler';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { updateFeaturesService , getUserAuthData } from '@/entities/User';
import Text from '@/shared/ui/Text';


type DesignVariants = 'old' | 'new'

const SettingsPage = () => {
    const {t} = useTranslation()
    const currentDesign = getFeatureFlag('isAppRedesigned')
    const dispatch = useAppDispatch()
    const userId = useSelector(getUserAuthData)?.id
    const [loading, setIsLoading] = useState(false)

    const designSelectOptions: SelectOptions<DesignVariants>[] = [
        {
            value: 'new',
            disabled: currentDesign,
            content: 'Новый'
        },
        {
            value: 'old',
            disabled: !currentDesign,
            content: 'Старый'
        }
    ]

    const changeDesignVariant = useCallback(async (value: DesignVariants) => {
        if(userId) {
            setIsLoading(true)
            await dispatch(updateFeaturesService({userId, newFeatures: {isAppRedesigned: value !== 'old'}})).unwrap()
            setIsLoading(false)
        }
    }, [dispatch, userId])

    return (
        <VStack align="start" gap="16">
            <Text title={t('Настройки')} size="size_xl"/>
            <Select
                label={t('Вариант дизайна:')}
                options={designSelectOptions}
                selectValue={currentDesign ? 'new' : 'old'}
                directionVariant="row"
                onChange={changeDesignVariant}
                editable={!loading}
            />
        </VStack>
    );
};

export default SettingsPage;
