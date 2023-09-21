import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import Card from '@/shared/ui/Card/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import Text from '@/shared/ui/Text/Text';
import StarRating from '@/shared/ui/StarRating/StarRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useDeviceDetect } from '@/shared/lib/hooks/useDeviceDetect';
import Drawer from '@/shared/ui/Drawer/Drawer';
import Input from '@/shared/ui/Input/Input';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import styles from './RatingCard.module.scss';

interface RatingCardProps {
    className?: string;
    title?: string
    feedbackTitle?: string
    feedbackText?: string
    selectedStars?: number
    onAcceptWithFeedback?: (starCount: number, feedback: string) => void
    onAcceptWithoutFeedback?: (starCount: number) => void
}

const RatingCard = (props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        feedbackText,
        onAcceptWithFeedback,
        onAcceptWithoutFeedback,
        selectedStars = 0,
    } = props;
    const { t } = useTranslation('ratingCard');
    const isMobile = useDeviceDetect();
    const [feedbackVisibility, setFeedbackVisibility] = useState(false);
    const [feedbackValue, setFeedbackValue] = useState('');
    const [selectedStarsCount, setSelectedStarsCount] = useState(selectedStars);

    const changeFeedbackVisibility = useCallback(() => {
        setFeedbackVisibility((prevState) => {
            if (prevState) {
                setFeedbackValue('');
                setSelectedStarsCount(0);
            }
            return !prevState;
        });
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
        setFeedbackValue('');
        setSelectedStarsCount(0);
        changeFeedbackVisibility();
    }, [changeFeedbackVisibility]);

    const feedbackContent = useMemo(() => {
        if (isMobile) {
            return (
                <Drawer visible={feedbackVisibility} changeVisibility={changeFeedbackVisibility}>
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
                changeVisibility={changeFeedbackVisibility}
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
        changeFeedbackVisibility, feedbackTitle, feedbackValue,
        feedbackVisibility, isMobile, t,
    ]);

    return (
        <Card className={classNames('', {}, [className])}>
            <VStack gap="8">
                { title && <Text title={title} /> }
                <StarRating
                    selectedStars={selectedStarsCount}
                    onSelect={selectStarsHandler}
                    selected={Boolean(selectedStarsCount)}
                />
                { feedbackText && <Text title={t('Ваш отзыв')} text={feedbackText} />}
            </VStack>
            {feedbackContent}
        </Card>
    );
};

export default RatingCard;
