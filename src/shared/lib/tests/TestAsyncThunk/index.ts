import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import axios, { AxiosStatic } from 'axios';

type ActionCreatorType<Returned, Arg, Rejected> = (arg: Arg) => AsyncThunkAction<Returned, Arg, {
    rejectValue: Rejected
}>

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<Returned, Arg, Rejected> {
    dispatch: Dispatch;

    getState: () => StateSchema;

    actionCreator: ActionCreatorType<Returned, Arg, Rejected>;

    api: jest.MockedFunctionDeep<AxiosStatic>;

    navigator: jest.MockedFn<any>;

    constructor(
        actionCreator: ActionCreatorType<Returned, Arg, Rejected>,
        state?: DeepPartial<StateSchema>,
    ) {
        this.dispatch = jest.fn();
        this.getState = jest.fn(() => state as StateSchema);
        this.actionCreator = actionCreator;
        this.navigator = jest.fn();
        this.api = mockedAxios;
    }

    async callThunk(arg: Arg) {
        return this.actionCreator(arg)(this.dispatch, this.getState, {
            api: this.api,
            navigator: this.navigator,
        });
    }
}
