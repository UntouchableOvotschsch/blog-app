import { Menu } from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppLink } from '../AppLink/AppLink';
import { Button, ThemeButton } from '../Button/Button';
import styles from './Dropdown.module.scss';

type DropdownPosition = 'top right' | 'top left' | 'bottom right' | 'bottom left'

const dropDownPositionClasses: Record<DropdownPosition, string> = {
    'top right': styles.topRight,
    'top left': styles.topLeft,
    'bottom left': styles.bottomLeft,
    'bottom right': styles.bottomRight,
};

export interface DropdownOptions {
    label: string
    onClick?: () => void
    href?: string
    disabled?: boolean
}

interface DropdownProps {
    className?: string;
    trigger: ReactNode
    options: DropdownOptions[]
    position?: DropdownPosition
}

const Dropdown = (props: DropdownProps) => {
    const {
        className, trigger, options, position,
    } = props;

    const classes = [
        position && dropDownPositionClasses[position],
    ];

    const renderOptionsList = useMemo(() => options.map((el) => {
        if (el.href) {
            return (
                <Menu.Item key={el.label} as={Fragment} disabled={el.disabled}>
                    {({ active }) => (
                        <AppLink
                            className={classNames(styles.option, { [styles.active]: active })}
                            to={el.href || ''}
                        >
                            {el.label}
                        </AppLink>
                    )}
                </Menu.Item>
            );
        }
        return (
            <Menu.Item key={el.label} as={Fragment}>
                {({ active }) => (
                    <Button
                        className={classNames(styles.option, { [styles.active]: active })}
                        onClick={el.onClick}
                        disabled={el.disabled}
                        theme={ThemeButton.CLEAR}
                    >
                        {el.label}
                    </Button>
                )}
            </Menu.Item>
        );
    }), [options]);

    return (
        <Menu
            as="div"
            className={classNames(styles.Dropdown, {}, [className])}
        >
            <Menu.Button className={styles.triggerBtn}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(styles.container, {}, classes)}>
                {renderOptionsList}
            </Menu.Items>
        </Menu>
    );
};

export default Dropdown;
