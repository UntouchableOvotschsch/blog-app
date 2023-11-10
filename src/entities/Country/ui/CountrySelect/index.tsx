import React, { useCallback, useMemo } from 'react';

import { Select } from '@/shared/ui/deprecated/Popups';

import { Countries } from '../../model/consts';

interface CountrySelectProps {
    selectValue: Countries | undefined;
    onChange?: (value: Countries) => void;
    editable?: boolean;
}
const CountrySelect = ({ editable = true, onChange, selectValue }: CountrySelectProps) => {
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

    return <Select selectValue={selectValue} options={countries} onChange={selectHandler} editable={editable} />;
};

export default CountrySelect;
