import { createReduxStore } from './config/store';
import type {
    ReduxStoreWithManager,
    StateSchema,
    ThunkConfigType,
    ThunkExtraArg,
} from './config/StateSchema';
import { StoreProvider } from './ui/StoreProvider';

export {
    StoreProvider,
    createReduxStore,
    StateSchema,
    ReduxStoreWithManager,
    ThunkExtraArg,
    ThunkConfigType,
};
