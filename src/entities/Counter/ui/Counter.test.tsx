import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderForTests } from '@/shared/config/jest/renderForTests';

import { Counter } from './Counter';
import { CounterSchema } from '../model/types/counterSchema';

describe('Counter', () => {
    const state: CounterSchema = { value: 0 };
    test('render', () => {
        renderForTests(<Counter />, {
            initialState: {
                counter: state,
            },
        });
        expect(screen.getByTestId('counter')).toBeInTheDocument();
        expect(screen.getByTestId('counter')).toHaveTextContent('0');
    });
    test('increment', async () => {
        renderForTests(<Counter />, {
            initialState: {
                counter: state,
            },
        });
        const incrementButton = screen.getByTestId('increment-button');
        expect(screen.getByTestId('counter')).toBeInTheDocument();
        await userEvent.click(incrementButton);
        expect(screen.getByTestId('value-title')).toHaveTextContent('1');
    });
    test('decrement', async () => {
        renderForTests(<Counter />, {
            initialState: {
                counter: state,
            },
        });
        const decrementButton = screen.getByTestId('decrement-button');
        expect(screen.getByTestId('counter')).toBeInTheDocument();
        await userEvent.click(decrementButton);
        expect(screen.getByTestId('value-title')).toHaveTextContent('-1');
    });
});
