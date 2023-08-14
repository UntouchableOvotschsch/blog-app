import { uiActions, uiReducer } from './model/slice/uiSlice';
import { UISchema } from './model/types/uiSchema';
import { getScrollPositions } from './model/selectors/getScrollPositions';
import { getScrollPositionByPage } from './model/selectors/getScrollPositionByPage';

export {
    UISchema,
    uiReducer,
    uiActions,
    getScrollPositions,
    getScrollPositionByPage,
};
