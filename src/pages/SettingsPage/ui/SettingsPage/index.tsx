import React, { useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { VStack } from '@/shared/ui/Stack';
import { Select, SelectOptions } from '@/shared/ui/Popups';
import { getFeatureFlag, setFeatureFlagsToLocalStorage } from '@/shared/lib/features/featureFlagsHandler';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { updateFeaturesService, getUserAuthData } from '@/entities/User';
import Text from '@/shared/ui/Text';

enum DesignVariants {
    old = 'old',
    new = 'new',
}

const SettingsPage = () => {
    const { t } = useTranslation();

    const isRedesigned = getFeatureFlag('isAppRedesigned');

    const dispatch = useAppDispatch();
    const userId = useSelector(getUserAuthData)?.id;
    const [loading, setIsLoading] = useState(false);

    const designSelectOptions = useMemo<SelectOptions<DesignVariants>[]>(
        () => [
            {
                value: DesignVariants.old,
                disabled: !isRedesigned ?? true,
                content: 'Старый',
            },
            ...(typeof isRedesigned !== 'undefined'
                ? [
                      {
                          value: DesignVariants.new,
                          disabled: isRedesigned,
                          content: 'Новый',
                      },
                  ]
                : []),
        ],
        [isRedesigned],
    );

    const changeDesignVariant = useCallback(
        async (value: DesignVariants) => {
            if (userId) {
                setIsLoading(true);
                try {
                    await dispatch(
                        updateFeaturesService({
                            userId,
                            newFeatures: { isAppRedesigned: value !== DesignVariants.old },
                        }),
                    ).unwrap();
                    setFeatureFlagsToLocalStorage({ isAppRedesigned: value !== DesignVariants.old });
                } catch (e) {
                    console.error(e);
                } finally {
                    setIsLoading(false);
                }
            }
        },
        [dispatch, userId],
    );

    return (
        <VStack align='start' gap='16'>
            <Text title={t('Настройки')} size='size_xl' />
            <Select
                label={t('Вариант дизайна:')}
                options={designSelectOptions}
                selectValue={isRedesigned ? DesignVariants.new : DesignVariants.old}
                directionVariant='row'
                onChange={changeDesignVariant}
                editable={!loading}
            />
        </VStack>
    );
};

export default SettingsPage;
