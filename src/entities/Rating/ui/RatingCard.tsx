import { useCallback, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useDeviceDetect } from '@/shared/lib/hooks/useDeviceDetect';
import { Button } from '@/shared/ui/Button';
import Card from '@/shared/ui/Card';
import Drawer from '@/shared/ui/Drawer';
import Input from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import StarRating from '@/shared/ui/StarRating';
import Text from '@/shared/ui/Text';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';

import RatingCardDeprecated from './Deprecated/RatingCardDeprecated';

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
                <Drawer visible={feedbackVisibility} changeVisibility={onModalClose}>
                    <Card theme='transparent'>
                        <VStack align='start' gap='32'>
                            <Text title={feedbackTitle} />
                            <Input value={feedbackValue} onChange={setFeedbackValue} placeholder={t('Введите отзыв')} />
                            <HStack justify='between'>
                                <Button theme='outline_red' onClick={cancelHandle}>
                                    {t('Отменить')}
                                </Button>
                                {feedbackValue ? (
                                    <Button onClick={acceptWithFeedbackHandle}>{t('Сохранить')}</Button>
                                ) : (
                                    <Button onClick={acceptWithoutFeedbackHandle}>{t('Сохранить без отзыва')}</Button>
                                )}
                            </HStack>
                        </VStack>
                    </Card>
                </Drawer>
            );
        }

        return (
            <Modal visible={feedbackVisibility} changeVisibility={onModalClose}>
                <Card theme='transparent' data-testid='RatingCard.Feedback.Content'>
                    <VStack align='start' gap='32'>
                        <Text title={feedbackTitle} />
                        <Input
                            value={feedbackValue}
                            onChange={setFeedbackValue}
                            placeholder={t('Введите отзыв')}
                            data-testid='RatingCard.Feedback.Input'
                        />
                        <HStack justify='between'>
                            <Button
                                theme='outline_red'
                                onClick={cancelHandle}
                                data-testid='RatingCard.Feedback.Button.Cancel'>
                                {t('Отменить')}
                            </Button>
                            <Button
                                theme='outline_green'
                                onClick={feedbackValue ? acceptWithFeedbackHandle : acceptWithoutFeedbackHandle}
                                data-testid='RatingCard.Feedback.Button.SaveWithFeedback'>
                                {feedbackValue ? t('Сохранить') : t('Сохранить без отзыва')}
                            </Button>
                        </HStack>
                    </VStack>
                </Card>
            </Modal>
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
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <Card className={className} data-testid='RatingCard' theme='light' padding='24' rounded>
                    <VStack gap='8'>
                        {!selectedStars && initialTitle && <Text title={initialTitle} align='center' />}
                        {!!selectedStars && successTitle && <Text title={successTitle} align='center' />}
                        <StarRating
                            selectedStars={selectedStarsCount}
                            onSelect={selectStarsHandler}
                            selected={Boolean(selectedStars)}
                        />
                        {feedbackText && (
                            <Text
                                data-testid='RatingCard.FeedbackText'
                                title={t('Ваш отзыв:')}
                                text={feedbackText}
                                align='center'
                            />
                        )}
                    </VStack>
                    {feedbackContent}
                </Card>
            }
            off={<RatingCardDeprecated {...props} />}
        />
    );
};

export default RatingCard;
