import React, { memo, useCallback, useEffect } from 'react';
import DynamicModuleLoader, { ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import Input, { InputAlign } from 'shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getAddNewCommentText } from 'features/AddNewComment/model/selectors/getAddNewCommentText';
import Text, { TextSize, ThemeText } from 'shared/ui/Text/Text';
import CheckIcon from 'shared/assets/icons/ok.svg';
import {
    getAddNewCommentLoading,
} from 'features/AddNewComment/model/selectors/getAddNewCommentLoading';
import {
    getAddNewCommentError,
} from 'features/AddNewComment/model/selectors/getAddNewCommentError';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slice/addNewCommentSlice';
import styles from './AddNewCommentForm.module.scss';
import { getAddNewCommentWasSent } from '../../model/selectors/getAddNewCommentWasSent';

const reducerList: ReducerList = {
    addNewComment: addNewCommentReducer,
};

interface AddNewCommentFormProps {
    addNewCommentTo: () => void
}

const AddNewCommentForm = memo(({
    addNewCommentTo,
}: AddNewCommentFormProps) => {
    const { t } = useTranslation('addNewCommentForm');
    const dispatch = useAppDispatch();

    const commentText = useSelector(getAddNewCommentText);
    const wasSent = useSelector(getAddNewCommentWasSent);
    const isLoading = useSelector(getAddNewCommentLoading);
    const isError = useSelector(getAddNewCommentError);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (wasSent) {
            timer = setTimeout(() => {
                dispatch(addNewCommentActions.setWasSent(false));
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
        dispatch(addNewCommentActions.setNewCommentText(value));
    }, [dispatch]);
    return (
        <DynamicModuleLoader reducerList={reducerList}>
            <div className={styles.container}>
                <div className={styles.commentForm}>
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
                </div>
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

export default AddNewCommentForm;
