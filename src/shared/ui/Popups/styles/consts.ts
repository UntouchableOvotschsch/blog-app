import styles from './Popups.module.scss';

export type DropdownPosition = 'top right' | 'top left' | 'bottom right' | 'bottom left'
export const dropDownPositionClasses: Record<DropdownPosition, string> = {
    'top right': styles.topRight,
    'top left': styles.topLeft,
    'bottom left': styles.bottomLeft,
    'bottom right': styles.bottomRight,
};
