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
        setFeedbackVisibility((prevState) => !prevState);
    }, []);

    const selectStarsHandler = useCallback((starsCount: number) => {
        setSelectedStarsCount(starsCount);
        changeFeedbackVisibility();
    }, [changeFeedbackVisibility]);

    const acceptHandle = useCallback(() => {
        onAcceptWithFeedback?.(selectedStarsCount, feedbackValue);
        changeFeedbackVisibility();
    }, [changeFeedbackVisibility, feedbackValue, onAcceptWithFeedback, selectedStarsCount]);

    const cancelHandler = useCallback(() => {
        setSelectedStarsCount(0);
        onAcceptWithoutFeedback?.(selectedStarsCount);
        changeFeedbackVisibility();
    }, [changeFeedbackVisibility, onAcceptWithoutFeedback, selectedStarsCount]);

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
                                    onClick={cancelHandler}
                                >
                                    {t('Отменить')}
                                </Button>
                                <Button
                                    onClick={acceptHandle}
                                >
                                    {t('Сохранить')}
                                </Button>
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
                                onClick={cancelHandler}
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                onClick={acceptHandle}
                            >
                                {t('Сохранить')}
                            </Button>
                        </HStack>
                    </VStack>
                </Card>
            </Modal>
        );
    }, [acceptHandle, cancelHandler,
        changeFeedbackVisibility, feedbackTitle,
        feedbackValue, feedbackVisibility,
        isMobile, t,
    ]);

    return (
        <Card className={classNames('', {}, [className])}>
            <VStack gap="8">
                { title && <Text title={title} /> }
                <StarRating selectedStars={selectedStarsCount} onSelect={selectStarsHandler} />
                { feedbackText && <Text title={t('Ваш отзыв')} text={feedbackText} />}
            </VStack>
            {feedbackContent}
        </Card>
    );
};

export default RatingCard;
