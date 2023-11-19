import React, { useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { Select as SelectDeprecated } from '@/shared/ui/deprecated/Popups';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import { Select } from '@/shared/ui/Popups';

import { Countries } from '../../model/consts';

interface CountrySelectProps {
    selectValue: Countries | undefined;
    onChange?: (value: Countries) => void;
    editable?: boolean;
}
const CountrySelect = ({ editable = true, onChange, selectValue }: CountrySelectProps) => {
    const { t } = useTranslation();

    const countries = useMemo(
        () =>
            Object.entries(Countries).map(([_, value]) => ({
                value,
                content: value,
            })),
        [],
    );
    const selectHandler = useCallback(
        (value: string) => {
            onChange?.(value as Countries);
        },
        [onChange],
    );

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <Select
                    label={t('Страна: ')}
                    directionVariant='row'
                    maxWidth
                    selectValue={selectValue}
                    options={countries}
                    onChange={selectHandler}
                    editable={editable}
                />
            }
            off={
                <SelectDeprecated
                    selectValue={selectValue}
                    options={countries}
                    onChange={selectHandler}
                    editable={editable}
                />
            }
        />
    );
};

export default CountrySelect;
