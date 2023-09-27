import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/shared/ui/Button';

import { getCounterValue } from '../model/selectors/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';

export const Counter = () => {
    const dispatch = useDispatch();
    const CounterValue = useSelector(getCounterValue);
    const { t } = useTranslation();
    const increment = () => {
        dispatch(counterActions.increment());
    };

    const decrement = () => {
        dispatch(counterActions.decrement());
    };
    return (
        <div
            data-testid="counter"
        >
            <h1
                data-testid="value-title"
            >
                {CounterValue}
            </h1>
            <Button
                data-testid="increment-button"
                onClick={increment}
            >
                {t('increment')}
            </Button>
            <Button
                data-testid="decrement-button"
                onClick={decrement}
            >
                {t('decrement')}
            </Button>
        </div>
    );
};
