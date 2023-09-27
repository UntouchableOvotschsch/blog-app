import { counterActions, counterReducer } from './counterSlice';
import { CounterSchema } from '../types/counterSchema';

describe('counterSlice', () => {
    const counterState: CounterSchema = { value: 10 };
    test('increment', () => {
        expect(counterReducer(counterState, counterActions.increment()))
            .toEqual<CounterSchema>({ value: 11 });
    });
    test('decrement', () => {
        expect(counterReducer(counterState, counterActions.decrement()))
            .toEqual<CounterSchema>({ value: 9 });
    });
    test('with empty state', () => {
        expect(counterReducer(undefined, counterActions.increment()))
            .toEqual<CounterSchema>({ value: 1 });
    });
});
