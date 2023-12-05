import React, { useCallback } from 'react';

import CopyIcon from '@/shared/assets/icons/Redesigned/copy-icon.svg';

import Card from '../Card';
import styles from './Code.module.scss';
import Icon from '../Icon';

interface CodeProps {
    className?: string;
    textCode: string;
}

const Code = ({ textCode, className }: CodeProps) => {
    const onCopy = useCallback(async () => {
        await navigator.clipboard.writeText(textCode);
    }, [textCode]);
    return (
        <Card theme='light' padding='16' className={className} rounded>
            <pre className={styles.container}>
                <code>{textCode}</code>
                <Icon Icon={CopyIcon} onClick={onCopy} className={styles.icon} clickable />
            </pre>
        </Card>
    );
};

export default Code;
