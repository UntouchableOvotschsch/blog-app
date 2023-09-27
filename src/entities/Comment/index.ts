import { commentFormActions } from './model/slice/commentFormSlice';
import { commentArrayTemplate, commentTemplate } from './model/templates/comment';
import type { CommentType } from './model/types/comment';
import { CommentFormSchema } from './model/types/commentFormSchema';
import Comment from './ui/Comment';
import CommentForm from './ui/CommentForm';
import CommentsList from './ui/CommentsList';

export {
    Comment,
    CommentType,
    CommentsList,
    commentFormActions,
    CommentForm,
    commentTemplate,
    commentArrayTemplate,
};

export type {
    CommentFormSchema,
};
