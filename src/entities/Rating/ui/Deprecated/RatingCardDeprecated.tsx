import { useCallback, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useDeviceDetect } from '@/shared/lib/hooks/useDeviceDetect';
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button';
import CardDeprecated from '@/shared/ui/deprecated/Card';
import DrawerDeprecated from '@/shared/ui/Drawer';
import Input from '@/shared/ui/deprecated/Input';
import { Modal as ModalDeprecated } from '@/shared/ui/deprecated/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import StarRatingDeprecated from '@/shared/ui/deprecated/StarRating';
import TextDeprecated, { TextAlign } from '@/shared/ui/deprecated/Text';

import styles from './RatingCard.module.scss';

interface RatingCardProps {
    className?: string;
    initialTitle?: string;
    successTitle?: string;
    feedbackTitle?: string;
    feedbackText?: string;
    selectedStars?: number;
    onAcceptWithFeedback?: (starCount: number, feedback?: string) => void;
    onAcceptWithoutFeedback?: (starCount: number) => void;
}

const RatingCardDeprecated = (props: RatingCardProps) => {
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

    const selectStarsHandler = useCallback(
        (starsCount: number) => {
            setSelectedStarsCount(starsCount);
            changeFeedbackVisibility();
        },
        [changeFeedbackVisibility],
    );

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
                <DrawerDeprecated visible={feedbackVisibility} changeVisibility={onModalClose}>
                    <CardDeprecated cardTheme='transparent' className={styles.feedbackContainer}>
                        <VStack align='start' gap='32'>
                            <TextDeprecated title={feedbackTitle} />
                            <Input value={feedbackValue} onChange={setFeedbackValue} placeholder={t('Введите отзыв')} />
                            <HStack justify='between'>
                                <ButtonDeprecated theme={ThemeButton.OUTLINE_RED} onClick={cancelHandle}>
                                    {t('Отменить')}
                                </ButtonDeprecated>
                                {feedbackValue ? (
                                    <ButtonDeprecated onClick={acceptWithFeedbackHandle}>
                                        {t('Сохранить')}
                                    </ButtonDeprecated>
                                ) : (
                                    <ButtonDeprecated onClick={acceptWithoutFeedbackHandle}>
                                        {t('Сохранить без отзыва')}
                                    </ButtonDeprecated>
                                )}
                            </HStack>
                        </VStack>
                    </CardDeprecated>
                </DrawerDeprecated>
            );
        }

        return (
            <ModalDeprecated visible={feedbackVisibility} changeVisibility={onModalClose}>
                <CardDeprecated
                    cardTheme='transparent'
                    className={styles.feedbackContainer}
                    data-testid='RatingCard.Feedback.Content'>
                    <VStack align='start' gap='32'>
                        <TextDeprecated title={feedbackTitle} />
                        <Input
                            value={feedbackValue}
                            onChange={setFeedbackValue}
                            placeholder={t('Введите отзыв')}
                            data-testid='RatingCard.Feedback.Input'
                        />
                        <HStack justify='between'>
                            <ButtonDeprecated
                                theme={ThemeButton.OUTLINE_RED}
                                onClick={cancelHandle}
                                data-testid='RatingCard.Feedback.Button.Cancel'>
                                {t('Отменить')}
                            </ButtonDeprecated>
                            {feedbackValue ? (
                                <ButtonDeprecated
                                    onClick={acceptWithFeedbackHandle}
                                    data-testid='RatingCard.Feedback.Button.SaveWithFeedback'>
                                    {t('Сохранить')}
                                </ButtonDeprecated>
                            ) : (
                                <ButtonDeprecated
                                    onClick={acceptWithoutFeedbackHandle}
                                    data-testid='RatingCard.Feedback.Button.SaveWithoutFeedback'>
                                    {t('Сохранить без отзыва')}
                                </ButtonDeprecated>
                            )}
                        </HStack>
                    </VStack>
                </CardDeprecated>
            </ModalDeprecated>
        );
    }, [
        acceptWithFeedbackHandle,
        acceptWithoutFeedbackHandle,
        cancelHandle,
        onModalClose,
        feedbackTitle,
        feedbackValue,
        feedbackVisibility,
        isMobile,
        t,
    ]);

    return (
        <CardDeprecated className={classNames(styles.RatingCard, {}, [className])} data-testid='RatingCard'>
            <VStack gap='8'>
                {!selectedStars && initialTitle && <TextDeprecated title={initialTitle} />}
                {!!selectedStars && successTitle && <TextDeprecated title={successTitle} />}
                <StarRatingDeprecated
                    selectedStars={selectedStarsCount}
                    onSelect={selectStarsHandler}
                    selected={Boolean(selectedStars)}
                />
                {feedbackText && (
                    <TextDeprecated
                        data-testid='RatingCard.FeedbackText'
                        title={t('Ваш отзыв:')}
                        text={feedbackText}
                        align={TextAlign.CENTER}
                    />
                )}
            </VStack>
            {feedbackContent}
        </CardDeprecated>
    );
};

export default RatingCardDeprecated;
