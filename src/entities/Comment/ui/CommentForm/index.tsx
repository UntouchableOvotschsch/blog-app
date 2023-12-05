import React, { memo, useCallback, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import OkIcon from '@/shared/assets/icons/Redesigned/ok-icon.svg';
import SendIcon from '@/shared/assets/icons/Redesigned/send_arrow_icon.svg';
import CheckIcon from '@/shared/assets/icons/ok.svg';
import DynamicModuleLoader, { ReducerList } from '@/shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import InputDeprecated, { InputAlign } from '@/shared/ui/deprecated/Input';
import Input from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';
import TextDeprecated, { TextSize, ThemeText } from '@/shared/ui/deprecated/Text';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import Icon from '@/shared/ui/Icon';

import styles from './AddNewCommentForm.module.scss';
import { getAddNewCommentError } from '../../model/selectors/getAddNewCommentError';
import { getAddNewCommentLoading } from '../../model/selectors/getAddNewCommentLoading';
import { getAddNewCommentText } from '../../model/selectors/getAddNewCommentText';
import { getAddNewCommentWasSent } from '../../model/selectors/getAddNewCommentWasSent';
import { commentFormActions, commentFormReducer } from '../../model/slice/commentFormSlice';

const reducerList: ReducerList = {
    commentForm: commentFormReducer,
};

interface CommentFormProps {
    addNewCommentTo: () => void;
    className?: string;
}

const CommentForm = memo(({ addNewCommentTo, className }: CommentFormProps) => {
    const { t } = useTranslation('commentForm');
    const dispatch = useAppDispatch();

    const commentText = useSelector(getAddNewCommentText);
    const wasSent = useSelector(getAddNewCommentWasSent);
    const isLoading = useSelector(getAddNewCommentLoading);
    const isError = useSelector(getAddNewCommentError);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (wasSent) {
            timer = setTimeout(() => {
                dispatch(commentFormActions.setWasSent(false));
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [dispatch, wasSent]);

    const sendComment = useCallback(() => {
        if (__PROJECT__ !== 'storybook') {
            addNewCommentTo();
            dispatch(commentFormActions.clearForm());
        }
    }, [addNewCommentTo, dispatch]);

    const changeNewCommentText = useCallback(
        (value: string) => {
            dispatch(commentFormActions.setNewCommentText(value));
        },
        [dispatch],
    );

    const couldSent = !(isLoading || wasSent) && !!commentText;

    return (
        <DynamicModuleLoader reducerList={reducerList}>
            <ToggleFeatureComponent
                /* eslint-disable-next-line i18next/no-literal-string */
                name='isAppRedesigned'
                on={
                    <HStack data-testid='CommentForm.Content' gap='16' className={className}>
                        <Input
                            placeholder={t('Комментировать')}
                            onChange={changeNewCommentText}
                            align='left'
                            value={commentText}
                            data-testid='CommentForm.Input'
                        />
                        <Icon
                            Icon={wasSent ? OkIcon : SendIcon}
                            onClick={couldSent ? sendComment : () => undefined}
                            clickable={couldSent}
                        />
                    </HStack>
                }
                off={
                    <div className={styles.container}>
                        <HStack data-testid='CommentForm.Content'>
                            <InputDeprecated
                                className={styles.input}
                                placeholder={t('Комментировать')}
                                onChange={changeNewCommentText}
                                align={InputAlign.LEFT}
                                value={commentText}
                                data-testid='CommentForm.Input'
                            />
                            <div className={styles.btnContainer}>
                                {wasSent ? (
                                    <CheckIcon className={styles.checkIcon} />
                                ) : (
                                    <ButtonDeprecated
                                        onClick={sendComment}
                                        disabled={isLoading || !commentText}
                                        data-testid='CommentForm.Button.Send'>
                                        {t('Отправить')}
                                    </ButtonDeprecated>
                                )}
                            </div>
                        </HStack>
                        {isError && <TextDeprecated theme={ThemeText.ERROR} text={t(isError)} size={TextSize.L} />}
                    </div>
                }
            />
        </DynamicModuleLoader>
    );
});

export default CommentForm;
