import React, {
    MutableRefObject, ReactNode, UIEvent, useEffect,
} from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useThrottle } from 'shared/lib/hooks/useThrottle';
import { getScrollPositionByPage, uiActions } from 'features/UI';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';

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
        <section
            className={classNames('wrapper', {}, [className])}
            ref={wrapperRef}
            onScroll={onScrollHandler}
        >
            {children}
        </section>
    );
};

export default PageWrapper;
