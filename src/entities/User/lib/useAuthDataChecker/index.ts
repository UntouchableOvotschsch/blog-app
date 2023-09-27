import { useSelector } from 'react-redux';

import { emptyObjChecker } from '@/shared/lib/helpers/emptyObjChecker';

import { getUserAuthData } from '../../model/selectors/getUserAuthData';

export const useAuthDataChecker = (): boolean => {
    const isSliceAuthData = useSelector(getUserAuthData);
    if (__PROJECT__ === 'storybook') {
        return true;
    }
    return !emptyObjChecker(isSliceAuthData);
};
