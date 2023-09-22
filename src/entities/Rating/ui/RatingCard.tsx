import { useTranslation } from 'react-i18next';
import {
    useCallback, useEffect, useMemo, useState,
} from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import Card from '@/shared/ui/Card/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import Text, { TextAlign } from '@/shared/ui/Text/Text';
import StarRating from '@/shared/ui/StarRating/StarRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useDeviceDetect } from '@/shared/lib/hooks/useDeviceDetect';
import Drawer from '@/shared/ui/Drawer/Drawer';
import Input from '@/shared/ui/Input/Input';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import styles from './RatingCard.module.scss';

interface RatingCardProps {
    className?: string;
    initialTitle?: string
    successTitle?: string
    feedbackTitle?: string
    feedbackText?: string
    selectedStars?: number
    onAcceptWithFeedback?: (starCount: number, feedback?: string) => void
    onAcceptWithoutFeedback?: (starCount: number) => void
}

const RatingCard = (props: RatingCardProps) => {
    const {
        className,
        initialTitle,
        successTitle,
        feedbackTitle,
        feedbackText,
        onAcceptWithFeedback,
        onAcceptWithoutFeedback,
        selectedStars,
    } = props;
    const { t } = useTranslation('ratingCard');
    const isMobile = useDeviceDetect();
    const [feedbackVisibility, setFeedbackVisibility] = useState(false);
    const [feedbackValue, setFeedbackValue] = useState('');
    const [selectedStarsCount, setSelectedStarsCount] = useState(0);

    useEffect(() => {
        if (selectedStars) {
            setSelectedStarsCount(selectedStars);
        }
    }, [selectedStars]);

    const changeFeedbackVisibility = useCallback(() => {
        setFeedbackVisibility((prevState) => !prevState);
    }, []);

    const onModalClose = useCallback(() => {
        setFeedbackVisibility(false);
        setFeedbackValue('');
        setSelectedStarsCount(0);
    }, []);

    const selectStarsHandler = useCallback((starsCount: number) => {
        setSelectedStarsCount(starsCount);
        changeFeedbackVisibility();
    }, [changeFeedbackVisibility]);

    const acceptWithFeedbackHandle = useCallback(() => {
        onAcceptWithFeedback?.(selectedStarsCount, feedbackValue);
        changeFeedbackVisibility();
    }, [changeFeedbackVisibility, feedbackValue, onAcceptWithFeedback, selectedStarsCount]);

    const acceptWithoutFeedbackHandle = useCallback(() => {
        onAcceptWithoutFeedback?.(selectedStarsCount);
        changeFeedbackVisibility();
    }, [changeFeedbackVisibility, onAcceptWithoutFeedback, selectedStarsCount]);

    const cancelHandle = useCallback(() => {
        onModalClose();
    }, [onModalClose]);

    const feedbackContent = useMemo(() => {
        if (isMobile) {
            return (
                <Drawer visible={feedbackVisibility} changeVisibility={onModalClose}>
                    <Card cardTheme="transparent" className={styles.feedbackContainer}>
                        <VStack
                            align="start"
                            gap="32"
                        >
                            <Text title={feedbackTitle} />
                            <Input
                                value={feedbackValue}
                                onChange={setFeedbackValue}
                                placeholder={t('Введите отзыв')}
                            />
                            <HStack justify="between">
                                <Button
                                    theme={ThemeButton.OUTLINE_RED}
                                    onClick={cancelHandle}
                                >
                                    {t('Отменить')}
                                </Button>
                                {
                                    feedbackValue
                                        ? (
                                            <Button
                                                onClick={acceptWithFeedbackHandle}
                                            >
                                                {t('Сохранить')}
                                            </Button>
                                        )
                                        : (
                                            <Button
                                                onClick={acceptWithoutFeedbackHandle}
                                            >
                                                {t('Сохранить без отзыва')}
                                            </Button>
                                        )
                                }
                            </HStack>
                        </VStack>
                    </Card>
                </Drawer>
            );
        }

        return (
            <Modal
                visible={feedbackVisibility}
                changeVisibility={onModalClose}
            >
                <Card cardTheme="transparent" className={styles.feedbackContainer}>
                    <VStack
                        align="start"
                        gap="32"
                    >
                        <Text title={feedbackTitle} />
                        <Input
                            value={feedbackValue}
                            onChange={setFeedbackValue}
                            placeholder={t('Введите отзыв')}
                        />
                        <HStack justify="between">
                            <Button
                                theme={ThemeButton.OUTLINE_RED}
                                onClick={cancelHandle}
                            >
                                {t('Отменить')}
                            </Button>
                            {
                                feedbackValue
                                    ? (
                                        <Button
                                            onClick={acceptWithFeedbackHandle}
                                        >
                                            {t('Сохранить')}
                                        </Button>
                                    )
                                    : (
                                        <Button
                                            onClick={acceptWithoutFeedbackHandle}
                                        >
                                            {t('Сохранить без отзыва')}
                                        </Button>
                                    )
                            }
                        </HStack>
                    </VStack>
                </Card>
            </Modal>
        );
    }, [
        acceptWithFeedbackHandle, acceptWithoutFeedbackHandle, cancelHandle,
        onModalClose, feedbackTitle, feedbackValue,
        feedbackVisibility, isMobile, t,
    ]);

    return (
        <Card className={classNames(styles.RatingCard, {}, [className])}>
            <VStack gap="8">
                { (!selectedStars && initialTitle) && <Text title={initialTitle} /> }
                { (!!selectedStars && successTitle) && <Text title={successTitle} /> }
                <StarRating
                    selectedStars={selectedStarsCount}
                    onSelect={selectStarsHandler}
                    selected={Boolean(selectedStars)}
                />
                { feedbackText && <Text title={t('Ваш отзыв:')} text={feedbackText} align={TextAlign.CENTER} />}
            </VStack>
            {feedbackContent}
        </Card>
    );
};

export default RatingCard;
