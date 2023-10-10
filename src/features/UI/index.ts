import { getScrollPositionByPage } from './model/selectors/getScrollPositionByPage';
import { getScrollPositions } from './model/selectors/getScrollPositions';
import { uiActions, uiReducer } from './model/slice/uiSlice';
import { UISchema } from './model/types/uiSchema';

export { uiReducer, uiActions, getScrollPositions, getScrollPositionByPage };

export type { UISchema };
