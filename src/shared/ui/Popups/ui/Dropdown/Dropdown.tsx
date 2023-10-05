import { ReactNode, useMemo } from 'react';

import { Menu } from '@headlessui/react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import { AppLink, AppLinkTheme } from '../../../AppLink';
import { Button, ThemeButton } from '../../../Button';
import { DropdownPosition, dropDownPositionClasses } from '../../styles/consts';
import popupStyles from '../../styles/Popups.module.scss';
import styles from './Dropdown.module.scss';

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
                <Menu.Item
                    key={el.label}
                    as="div"
                    disabled={el.disabled}
                    className={popupStyles.option}
                >
                    {({ active }) => (
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            className={
                                classNames(
                                    popupStyles.optionItem,
                                    { [popupStyles.active]: active },
                                    [styles.link],
                                )
                            }
                            to={el.href!}
                        >
                            {el.label}
                        </AppLink>
                    )}
                </Menu.Item>
            );
        }
        return (
            <Menu.Item
                key={el.label}
                as="div"
            >
                {({ active }) => (
                    <Button
                        className={
                            classNames(
                                popupStyles.optionItem,
                                { [popupStyles.active]: active },
                                [styles.btn],
                            )
                        }
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
            <Menu.Button as="div">
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(popupStyles.itemsContainer, {}, classes)}>
                {renderOptionsList}
            </Menu.Items>
        </Menu>
    );
};

export default Dropdown;
