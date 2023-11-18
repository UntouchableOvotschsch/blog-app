import React from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { typedMemo } from '@/shared/lib/helpers/typedMemo';

import { Button } from '../Button';
import styles from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
    className?: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface ClickableIconProps extends IconBaseProps {
    clickable?: true;
    onClick: () => void;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}
type IconProps = ClickableIconProps | NonClickableIconProps;

const Icon = typedMemo((props: IconProps) => {
    const { className, Icon, width = 32, height = 32, clickable, ...otherProps } = props;

    const icon = (
        <Icon
            className={classNames(styles.Icon, {}, [className])}
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            // eslint-disable-next-line i18next/no-literal-string
            <Button theme='clear' onClick={props.onClick} className={styles.button} style={{ width, height }}>
                {icon}
            </Button>
        );
    }

    return icon;
});

export default Icon;
