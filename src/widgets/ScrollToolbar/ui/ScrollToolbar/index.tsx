import React from 'react';

import { VStack } from '@/shared/ui/Stack';
import { ScrollToTopBtn } from '@/features/ScrollToTopBtn';
import { typedMemo } from '@/shared/lib/helpers/typedMemo';

import styles from './ScrollToolbar.module.scss';

interface ScrollToolbarProps {
    onClick?: () => void;
}

const ScrollToolbar = typedMemo((props: ScrollToolbarProps) => {
    const { onClick } = props;
    return (
        <VStack className={styles.container} align='center' justify='center'>
            <ScrollToTopBtn onClick={onClick} />
        </VStack>
    );
});

export default ScrollToolbar;
