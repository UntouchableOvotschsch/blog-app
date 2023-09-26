import { useSelector } from 'react-redux';
import { getUserAuthData } from '../../model/selectors/getUserAuthData';
import { emptyObjChecker } from '@/shared/lib/helpers/emptyObjChecker';

export const useAuthDataChecker = (): boolean => {
    const isSliceAuthData = useSelector(getUserAuthData);
    if (__PROJECT__ === 'storybook') {
        return true;
    }
    return !emptyObjChecker(isSliceAuthData);
};
