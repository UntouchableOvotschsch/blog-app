import React, { memo, useCallback, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CheckIcon from '@/shared/assets/icons/ok.svg';
import DynamicModuleLoader, { ReducerList } from '@/shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import Input, { InputAlign } from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';
import Text, { TextSize, ThemeText } from '@/shared/ui/Text';

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
    addNewCommentTo: () => void
}

const CommentForm = memo(({
    addNewCommentTo,
}: CommentFormProps) => {
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

    const changeNewCommentText = useCallback((value: string) => {
        dispatch(commentFormActions.setNewCommentText(value));
    }, [dispatch]);
    return (
        <DynamicModuleLoader reducerList={reducerList}>
            <div className={styles.container}>
                <HStack data-testid="CommentForm.Content">
                    <Input
                        className={styles.input}
                        placeholder={t('Комментировать')}
                        onChange={changeNewCommentText}
                        align={InputAlign.LEFT}
                        value={commentText}
                        data-testid="CommentForm.Input"
                    />
                    <div className={styles.btnContainer}>

                        {
                            wasSent
                                ? (<CheckIcon className={styles.checkIcon} />)
                                : (
                                    <Button
                                        onClick={sendComment}
                                        disabled={isLoading || !commentText}
                                        data-testid="CommentForm.Button.Send"
                                    >
                                        {t('Отправить')}
                                    </Button>
                                )
                        }

                    </div>
                </HStack>
                {
                    isError && (
                        <Text
                            theme={ThemeText.ERROR}
                            text={t(isError)}
                            size={TextSize.L}
                        />
                    )
                }
            </div>
        </DynamicModuleLoader>
    );
});

export default CommentForm;
