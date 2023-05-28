import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { emptyObjChecker } from 'shared/lib/helpers/emptyObjChecker';

export const useAuthDataChecker = (): boolean => {
    const isSliceAuthData = useSelector(getUserAuthData);
    if (__PROJECT__ === 'storybook' && !emptyObjChecker(isSliceAuthData)) {
        return true;
    }
    const localStorageAuthData = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (localStorageAuthData) {
        return !(
            emptyObjChecker(isSliceAuthData)
            && emptyObjChecker(JSON.parse(localStorageAuthData))
        );
    }
    return false;
};
