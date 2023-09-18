import React, { memo, useCallback, useMemo } from 'react';
import Select from 'shared/ui/Popups/ui/Select';
import { Currencies } from '../../model/types/currencies';

interface CurrencySelectProps {
    selectValue: Currencies | undefined
    onChange?: (value: Currencies) => void
    editable?: boolean
}
const CurrencySelect = memo(({ editable = true, onChange, selectValue }: CurrencySelectProps) => {
    const currencies = useMemo(() => Object.entries(Currencies).map(([_, value]) => ({
        value,
        content: value,
    })), []);
    const selectHandler = useCallback((value: string) => {
        onChange?.(value as Currencies);
    }, [onChange]);
    return (
        <Select
            selectValue={selectValue}
            options={currencies}
            onChange={selectHandler}
            editable={editable}
        />
    );
});

export default CurrencySelect;
