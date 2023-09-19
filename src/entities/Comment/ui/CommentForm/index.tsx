import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import DynamicModuleLoader, { ReducerList } from '@/shared/lib/components/DynamicModuleLoader';
import Input, { InputAlign } from '@/shared/ui/Input/Input';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button/Button';
import Text, { TextSize, ThemeText } from '@/shared/ui/Text/Text';
import CheckIcon from '@/shared/assets/icons/ok.svg';
import { HStack } from '@/shared/ui/Stack';
import { getAddNewCommentText } from '../../model/selectors/getAddNewCommentText';
import { getAddNewCommentLoading } from '../../model/selectors/getAddNewCommentLoading';
import { getAddNewCommentError } from '../../model/selectors/getAddNewCommentError';
import { commentFormActions, commentFormReducer } from '../../model/slice/commentFormSlice';
import styles from './AddNewCommentForm.module.scss';
import { getAddNewCommentWasSent } from '../../model/selectors/getAddNewCommentWasSent';

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

    const sendComment = useCallback(async () => {
        if (__PROJECT__ !== 'storybook') {
            await addNewCommentTo();
        }
    }, [addNewCommentTo]);

    const changeNewCommentText = useCallback((value: string) => {
        dispatch(commentFormActions.setNewCommentText(value));
    }, [dispatch]);
    return (
        <DynamicModuleLoader reducerList={reducerList}>
            <div className={styles.container}>
                <HStack>
                    <Input
                        className={styles.input}
                        placeholder={t('Комментировать')}
                        onChange={changeNewCommentText}
                        align={InputAlign.LEFT}
                        value={commentText}
                    />
                    <div className={styles.btnContainer}>

                        {
                            wasSent
                                ? (<CheckIcon className={styles.checkIcon} />)
                                : (
                                    <Button
                                        onClick={sendComment}
                                        disabled={isLoading || !commentText}
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
