import React, { useCallback, useState } from 'react';

import CopyIcon from '@/shared/assets/icons/copy.svg';
import OkIcon from '@/shared/assets/icons/ok.svg';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import styles from './Code.module.scss';
import { Button, ThemeButton } from '../Button';
import Icon from '../Icon';

interface CodeProps {
    className?: string
    textCode: string
}
const Code = ({ textCode, className }: CodeProps) => {
    const [copied, setCopied] = useState(false);
    const onCopy = useCallback(async () => {
        await navigator.clipboard.writeText(textCode);
        setCopied(true);
    }, [textCode]);
    return (
        <div className={classNames(styles.Code, {}, [className])}>
            <pre className={styles.container}>
                <code className={styles.codeWrapper}>
                    {textCode}
                </code>
                <div>
                    <Button
                        theme={ThemeButton.CLEAR}
                        className={styles.copyBtn}
                        onClick={onCopy}
                    >
                        {
                            copied ? (
                                <Icon
                                    Icon={OkIcon}
                                />
                            ) : (
                                <CopyIcon
                                    className={styles.icon}
                                />
                            )
                        }

                    </Button>
                </div>
            </pre>
        </div>

    );
};

export default Code;
