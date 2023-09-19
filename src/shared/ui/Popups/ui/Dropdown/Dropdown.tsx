import { Menu } from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink, AppLinkTheme } from '../../../AppLink/AppLink';
import { Button, ThemeButton } from '../../../Button/Button';
import styles from './Dropdown.module.scss';
import { DropdownPosition, dropDownPositionClasses } from '../../styles/consts';
import popupStyles from '../../styles/Popups.module.scss';

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
        styles.itemsContainer,
    ];

    const renderOptionsList = useMemo(() => options.map((el) => {
        if (el.href) {
            return (
                <Menu.Item key={el.label} as={Fragment} disabled={el.disabled}>
                    {({ active }) => (
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            className={classNames(popupStyles.option, { [popupStyles.active]: active })}
                            to={el.href!}
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
                        className={classNames(popupStyles.option, { [popupStyles.active]: active })}
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
            className={classNames(popupStyles.container, {}, [className])}
        >
            <Menu.Button as={Fragment}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(popupStyles.itemsContainer, {}, classes)}>
                {renderOptionsList}
            </Menu.Items>
        </Menu>
    );
};

export default Dropdown;
