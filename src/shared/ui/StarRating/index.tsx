import { useCallback, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import styles from './StarRating.module.scss';
import Icon from '../Icon';
import Star from '@/shared/assets/icons/star.svg';

interface StarRatingProps {
    className?: string;
    selectedStars?: number
    onSelect?: (selectedStarts: number) => void
    selected?: boolean
    starsLength?: number
}

const StarRating = (props: StarRatingProps) => {
    const {
        selectedStars = 0,
        selected = false,
        starsLength = 5,
        onSelect,
        className,
    } = props;

    const [hoveredCount, setHoveredCount] = useState(0);

    const onMouseEnter = useCallback((starNumber: number) => () => {
        if (!selected) {
            setHoveredCount(starNumber);
        }
    }, [selected]);

    const onMouseLeave = useCallback(() => {
        if (!selected) {
            setHoveredCount(0);
        }
    }, [selected]);

    const onClickHandler = useCallback((starNumber: number) => () => {
        if (!selected) {
            onSelect?.(starNumber);
        }
    }, [onSelect, selected]);

    const starsArray = useMemo(() => (
        new Array(starsLength).fill(0).map((star, index) => (
            <Icon
                Icon={Star}
                key={`star-key${index}`}
                onTouchStart={onMouseEnter(index + 1)}
                onMouseEnter={onMouseEnter(index + 1)}
                onMouseLeave={onMouseLeave}
                className={
                    classNames(
                        styles.starIcon,
                        {
                            [styles.hovered]: hoveredCount >= index + 1,
                            [styles.selected]: selectedStars >= index + 1,
                            [styles.disabled]: selected,
                        },
                        [],
                    )
                }
                onClick={onClickHandler(index + 1)}
            />
        ))
    ), [hoveredCount, onClickHandler, onMouseEnter, onMouseLeave, selected, selectedStars, starsLength]);

    return (
        <div className={classNames('', {}, [className])}>
            {starsArray}
        </div>
    );
};

export default StarRating;
