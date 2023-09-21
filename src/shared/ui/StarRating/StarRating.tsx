import { useCallback, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import styles from './StarRating.module.scss';
import Icon from '@/shared/ui/Icon';
import Star from '@/shared/assets/icons/star.svg';

interface StarRatingProps {
    className?: string;
    selectedStars?: number
    onSelect?: (selectedStarts: number) => void
    starsLength?: number
}

const StarRating = (props: StarRatingProps) => {
    const {
        selectedStars = 0,
        onSelect,
        className,
        starsLength = 5,
    } = props;

    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));
    const [selectedCount, setSelectedCount] = useState(selectedStars);

    const onMouseEnter = useCallback((starNumber: number) => () => {
        if (!isSelected) {
            setSelectedCount(starNumber);
        }
    }, [isSelected]);

    const onMouseLeave = useCallback(() => {
        if (!isSelected) {
            setSelectedCount(0);
        }
    }, [isSelected]);

    const onClickHandler = useCallback((starNumber: number) => () => {
        if (!isSelected) {
            onSelect?.(starNumber);
            setIsSelected(true);
        }
    }, [isSelected, onSelect]);

    const starsArray = useMemo(() => (
        new Array(starsLength).fill(0).map((star, index) => (
            <Icon
                Icon={Star}
                key={`star-key${index}`}
                onMouseEnter={onMouseEnter(index + 1)}
                onMouseLeave={onMouseLeave}
                className={
                    classNames(
                        styles.starIcon,
                        {
                            [styles.hovered]: selectedCount >= index + 1,
                            [styles.selected]: isSelected,
                        },
                        [],
                    )
                }
                onClick={onClickHandler(index + 1)}
            />
        ))
    ), [isSelected, onClickHandler, onMouseEnter, onMouseLeave, selectedCount, starsLength]);

    return (
        <div className={classNames('', {}, [className])}>
            {starsArray}
        </div>
    );
};

export default StarRating;
