import React, {
    MutableRefObject, ReactNode, UIEvent, useEffect,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useThrottle } from '@/shared/lib/hooks/useThrottle';
import { getScrollPositionByPage, uiActions } from '@/features/UI';
import { StateSchema } from '@/app/providers/StoreProvider';

interface PageWrapperProps {
    children: ReactNode
    wrapperRef?: MutableRefObject<HTMLDivElement>
    className?: string
    trackScroll?: boolean
}

const PageWrapper = ({
    children,
    wrapperRef,
    className,
    trackScroll,
}: PageWrapperProps) => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const scrollPosition = useSelector(
        (state: StateSchema) => getScrollPositionByPage(state, pathname),
    );

    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && wrapperRef?.current) {
            wrapperRef.current.scrollTop = scrollPosition;
        }
    }, [scrollPosition, wrapperRef]);

    const onScrollHandler = useThrottle((e: UIEvent<HTMLDivElement>) => {
        if (trackScroll) {
            dispatch(uiActions.setScrollPosition({
                pathname, scroll: e.currentTarget.scrollTop,
            }));
        }
    }, 200);

    return (
        <main
            className={classNames('wrapper', {}, [className])}
            ref={wrapperRef}
            onScroll={onScrollHandler}
        >
            {children}
        </main>
    );
};

export default PageWrapper;
