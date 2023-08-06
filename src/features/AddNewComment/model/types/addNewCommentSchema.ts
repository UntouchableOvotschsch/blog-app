export interface AddNewCommentSchema {
    commentText?: string;
    isLoading: boolean;
    error?: string;
    wasSent?: boolean;
}
