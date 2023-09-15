import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { emptyObjChecker } from '../../helpers/emptyObjChecker';

export const useAuthDataChecker = (): boolean => {
    const isSliceAuthData = useSelector(getUserAuthData);
    if (__PROJECT__ === 'storybook') {
        return true;
    }
    return !emptyObjChecker(isSliceAuthData);
};
