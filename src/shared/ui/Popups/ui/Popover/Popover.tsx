import { Fragment, ReactNode } from 'react';

import { Popover as HPopover } from '@headlessui/react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import { DropdownPosition, dropDownPositionClasses } from '../../styles/consts';
import popupStyles from '../../styles/Popups.module.scss';

interface PopoverProps {
    className?: string;
    trigger: ReactNode
    children: ReactNode
    position?: DropdownPosition
}

const Popover = (props: PopoverProps) => {
    const {
        className, trigger, children, position,
    } = props;

    const classes = [
        position && dropDownPositionClasses[position],
    ];
    return (
        <HPopover
            as="div"
            className={classNames(popupStyles.container, {}, [className])}
        >
            <HPopover.Button as={Fragment}>
                {trigger}
            </HPopover.Button>
            <HPopover.Panel className={classNames(popupStyles.itemsContainer, {}, classes)}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
};

export default Popover;
