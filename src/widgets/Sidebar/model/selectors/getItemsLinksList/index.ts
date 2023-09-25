import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import HomeIcon from '@/shared/assets/icons/home.svg';
import ListIcon from '@/shared/assets/icons/list.svg';
import Profile from '@/shared/assets/icons/profile.svg';
import ArticlesIcon from '@/shared/assets/icons/articles.svg';
import { ItemType } from '../../types/item';
import { RoutePath } from '@/shared/const/router';

export const getItemsLinksList = createSelector(
    getUserAuthData,
    (userData) => {
        const result: ItemType[] = [
            {
                path: RoutePath.main,
                Icon: HomeIcon,
                text: 'Главная',
            },
            {
                path: RoutePath.about,
                Icon: ListIcon,
                text: 'О нас',
            },
        ];
        if (userData) {
            result.push(
                {
                    path: `${RoutePath.profile}/${userData.id}`,
                    Icon: Profile,
                    text: 'Мой профиль',
                    authOnly: true,
                },
                {
                    path: RoutePath.articles,
                    Icon: ArticlesIcon,
                    text: 'Статьи',
                    authOnly: true,
                },
            );
        }
        return result;
    },
);
