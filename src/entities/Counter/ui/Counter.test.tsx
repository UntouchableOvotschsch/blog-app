import { screen } from '@testing-library/react';

import { renderForTests } from 'shared/config/jest/renderForTests';
import { Counter, CounterSchema } from 'entities/Counter';
import { userEvent } from '@storybook/testing-library';

describe('Counter', () => {
    const state: CounterSchema = { value: 0 };
    test('render', () => {
        renderForTests(<Counter />, {
            initialState: {
                counter: state,
            },
        });
        expect(screen.getByTestId('counter'))
            .toBeInTheDocument();
        expect(screen.getByTestId('counter'))
            .toHaveTextContent('0');
    });
    test('increment', () => {
        renderForTests(<Counter />, {
            initialState: {
                counter: state,
            },
        });
        const incrementButton = screen.getByTestId('increment-button');
        expect(screen.getByTestId('counter'))
            .toBeInTheDocument();
        userEvent.click(incrementButton);
        expect(screen.getByTestId('value-title'))
            .toHaveTextContent('1');
    });
    test('decrement', () => {
        renderForTests(<Counter />, {
            initialState: {
                counter: state,
            },
        });
        const decrementButton = screen.getByTestId('decrement-button');
        expect(screen.getByTestId('counter'))
            .toBeInTheDocument();
        userEvent.click(decrementButton);
        expect(screen.getByTestId('value-title'))
            .toHaveTextContent('-1');
    });
});
