import React from 'react';

import { typedMemo } from '@/shared/lib/helpers/typedMemo';
import Icon from '@/shared/ui/Icon';
import CircleArrow from '@/shared/assets/icons/Redesigned/circle-arrow.svg';
import { useScrollPosition } from '@/shared/lib/hooks/useScrollPosition';

const defaultOnClickHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

interface ScrollToTopBtnProps {
    className?: string;
    onClick?: () => void;
}

const ScrollToTopBtn = typedMemo((props: ScrollToTopBtnProps) => {
    const { className, onClick = defaultOnClickHandler } = props;

    const { scrollY } = useScrollPosition();

    if (scrollY < 100) {
        return null;
    }

    return <Icon Icon={CircleArrow} clickable onClick={onClick} className={className} />;
});

export default ScrollToTopBtn;
