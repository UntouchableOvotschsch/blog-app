import { commentFormActions, commentFormReducer } from './model/slice/commentFormSlice';
import type { CommentType } from './model/types/comment';
import { CommentFormSchema } from './model/types/commentFormSchema';
import Comment from './ui/Comment';
import CommentForm from './ui/CommentForm';
import CommentsList from './ui/CommentsList';
import { commentArrayTemplate, commentTemplate } from './model/templates/comment';

export {
    Comment,
    CommentType,
    CommentsList,
    commentFormReducer,
    commentFormActions,
    CommentForm,
    commentTemplate,
    commentArrayTemplate,
};

export type {
    CommentFormSchema,
};
