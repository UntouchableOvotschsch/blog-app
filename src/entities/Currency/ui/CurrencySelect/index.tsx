import React, { memo, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { Select as SelectDeprecated } from '@/shared/ui/deprecated/Popups';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import { Select } from '@/shared/ui/Popups';

import { Currencies } from '../../model/types/currencies';

interface CurrencySelectProps {
    selectValue: Currencies | undefined;
    onChange?: (value: Currencies) => void;
    editable?: boolean;
}
const CurrencySelect = memo(({ editable = true, onChange, selectValue }: CurrencySelectProps) => {
    const { t } = useTranslation();

    const currencies = useMemo(
        () =>
            Object.entries(Currencies).map(([_, value]) => ({
                value,
                content: value,
            })),
        [],
    );
    const selectHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currencies);
        },
        [onChange],
    );
    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <Select
                    label={t('Валюта: ')}
                    directionVariant='row'
                    maxWidth
                    selectValue={selectValue}
                    options={currencies}
                    onChange={selectHandler}
                    editable={editable}
                />
            }
            off={
                <SelectDeprecated
                    selectValue={selectValue}
                    options={currencies}
                    onChange={selectHandler}
                    editable={editable}
                />
            }
        />
    );
});

export default CurrencySelect;
