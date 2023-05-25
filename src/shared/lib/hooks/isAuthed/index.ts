import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

export const useAuthDataChecker = (): boolean => {
    const isSliceAuthData = useSelector(getUserAuthData);
    const localStorageAuthData = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (localStorageAuthData) {
        return !!(isSliceAuthData && JSON.parse(localStorageAuthData));
    }
    return false;
};
