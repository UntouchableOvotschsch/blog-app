import { AddNewCommentSchema } from 'features/AddNewComment/model/types/addNewCommentSchema';
import { addNewCommentActions, addNewCommentReducer } from './model/slice/addNewCommentSlice';
import {
    AddNewCommentFormAsync as AddNewCommentForm,
} from './ui/AddNewCommentForm/AddNewCommentFrom.async';

export {
    addNewCommentReducer,
    addNewCommentActions,
    AddNewCommentSchema,
    AddNewCommentForm,
};
