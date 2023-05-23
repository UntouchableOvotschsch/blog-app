import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

type ActionCreatorType<Returned, Arg, Rejected> = (arg: Arg) => AsyncThunkAction<Returned, Arg, {
    rejectValue: Rejected
}>

export class TestAsyncThunk<Returned, Arg, Rejected> {
    dispatch: Dispatch;

    getState: () => StateSchema;

    actionCreator: ActionCreatorType<Returned, Arg, Rejected>;

    constructor(actionCreator: ActionCreatorType<Returned, Arg, Rejected>) {
        this.dispatch = jest.fn();
        this.getState = jest.fn();
        this.actionCreator = actionCreator;
    }

    async callThunk(arg: Arg) {
        return this.actionCreator(arg)(this.dispatch, this.getState, undefined);
    }
}
