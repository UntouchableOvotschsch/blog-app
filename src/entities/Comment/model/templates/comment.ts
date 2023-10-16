import { UserRoles } from '@/entities/User';
import ProfileImage from '@/shared/assets/tests/profileImage.jpg';

export const commentTemplate = {
    id: '1',
    text: 'Крутая статья',
    articleId: '1',
    user: {
        id: '1',
        roles: [UserRoles.USER],
        username: 'admin',
        avatar: ProfileImage,
    },
};

export const commentArrayTemplate = new Array(7).fill(0).map((el, index) => ({
    ...commentTemplate,
    id: String(index + 1),
}));
