import { useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { getUserInited, User, userActions } from '@/entities/User';
import { loginByUsername } from '@/features/AuthByUsername';
import { getRouteLogin } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useForceUpdate } from '@/shared/render/ForceUpdateProvider';


export const useLoginByLocalStorageData = () => {
    const [loading, setLoading] = useState(false)
    const inited = useSelector(getUserInited);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const forceUpdate = useForceUpdate()


    const loginByLocalStorageData = useCallback(async () => {
        setLoading(true)
        const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (user) {
            const { username, password }: User = JSON.parse(user);
            try {
                await dispatch(loginByUsername({ username, password: password! })).unwrap();
                forceUpdate()
            } catch (e) {
                navigate(getRouteLogin());
            }
        }
    }, [dispatch, navigate, forceUpdate]);



    useEffect(() => {
        if(!inited) {
            loginByLocalStorageData()
                .finally(() => {
                    setLoading(false);
                    dispatch(userActions.setInited(true));
                });
        }
    }, [dispatch, inited, loginByLocalStorageData]);


    return useMemo(() => ({
        loading,
        inited,
    }), [inited, loading])

}
